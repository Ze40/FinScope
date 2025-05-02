/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';

import {
  CreateDatabaseDto,
  CreateDataResponse,
} from './dto/create-database.dto';
import { DeleteMultipleDto, DeleteResponse } from './dto/delete-some.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Injectable()
export class DatabaseService {
  private pool: Pool;
  private dictionary: { [key: string]: { [key: string]: string } };
  private reverseDictionary: { [key: string]: { [key: string]: string } };

  constructor(configService: ConfigService) {
    const config: PoolConfig = {
      user: configService.getOrThrow('DB_USERNAME'),
      host: configService.getOrThrow('DB_HOST'),
      database: configService.getOrThrow('DB_DATABASE'),
      password: configService.getOrThrow('DB_PASSWORD'),
      port: configService.getOrThrow('DB_PORT'),
    };
    this.pool = new Pool(config);
    this.dictionary = {
      stat_data: {
        stat_data_id: 'id',
        year: 'год',
        production_id: 'id производства',
        region_id: 'id региона',
        branch_id: 'id отрасли',
        indicator_id: 'id показателя',
        city_id: 'id города',
      },
    };

    function invertObject<T extends Record<string, string>>(obj: T) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [value, key]),
      );
    }
    this.reverseDictionary = {
      stat_data: invertObject(this.dictionary['stat_data']),
    };
  }

  async onModuleInit() {
    try {
      await this.pool.query('SELECT 1');
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async getAllTables(): Promise<string[]> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      `;
      const result = await client.query<{ table_name: string }>(query);
      return result.rows.map((row: { table_name: string }) => row.table_name);
    } finally {
      client.release();
    }
  }

  async getFileds(tableName: string): Promise<string[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(`SELECT * FROM ${tableName} LIMIT 1`);
      return result.fields
        .map((field) => this.dictionary[tableName][field.name])
        .filter((field) => field !== 'id');
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Failed to fetch government data');
    } finally {
      client.release();
    }
  }

  async getData({ page = 1, limit = 20 }: { page: number; limit: number }) {
    const offset = (page - 1) * limit;
    if (isNaN(page) || isNaN(limit)) {
      throw new BadRequestException('Invalid pagination params');
    }
    const client = await this.pool.connect();
    try {
      const dataQuery = `
      SELECT *
      FROM stat_data
      LIMIT $1
      OFFSET $2
    `;

      const dataRes = await client.query(dataQuery, [limit, offset]);

      const fields = dataRes.fields.map(
        (e) => this.dictionary['stat_data'][e.name],
      );

      const rows = dataRes.rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          newRow[this.dictionary['stat_data'][key]] = row[key] as string;
        }
        return newRow;
      });
      return { rows, fields };
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Failed to fetch government data');
    } finally {
      client.release();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} database`;
  }

  async update(
    tableName: string,
    id: number,
    updateDatabaseDto: UpdateDatabaseDto,
  ): Promise<{ success: boolean; affectedRows?: number }> {
    if (!tableName || !id || !updateDatabaseDto) {
      throw new Error('Invalid input parameters');
    }

    const client = await this.pool.connect();

    try {
      // Подготавливаем данные для обновления
      const setClause = Object.keys(updateDatabaseDto)
        .map(
          (key) =>
            `"${this.reverseDictionary[tableName][key]}" = ${updateDatabaseDto[key]}`,
        )
        .join(', ');

      const queryText = `
        UPDATE "${tableName}"
        SET ${setClause}
        WHERE ${this.reverseDictionary[tableName]['id']} = $1
        RETURNING *;
      `;

      const result = await client.query(queryText, [id]);

      return {
        success: true,
        affectedRows: result.rowCount || 0,
      };
    } catch (error) {
      throw new Error(`Database operation failed: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async remove(id: number, tableName: string, idField: string) {
    const client = await this.pool.connect();
    try {
      const dataQuery = `DELETE FROM ${tableName} WHERE ${idField} = $1`;
      const result = await client.query(dataQuery, [id]);
      if (!result) throw Error('Ошибка результата');
      return {
        success: true,
        message: 'DELETE IS OK',
        deletedId: id,
      };
    } catch (error) {
      throw new Error(`'${tableName}' ${error}`);
    } finally {
      client.release();
    }
  }

  async deleteSome({
    ids,
    tableName,
    idField,
  }: DeleteMultipleDto): Promise<DeleteResponse> {
    if (!ids.length) {
      return {
        success: false,
        message: 'No IDs provided for deletion',
        deletedIds: [],
        errorIds: [],
      };
    }

    const client = await this.pool.connect();
    const deletedIds: string[] = [];
    const errorIds: string[] = [];

    try {
      await client.query('BEGIN');

      for (const id of ids) {
        try {
          const query = `DELETE FROM ${tableName} WHERE ${idField} = $1`;
          const result = await client.query(query, [id]);

          if (!result) throw Error('Ошибка результата');
          if (result.rowCount !== null && result.rowCount > 0) {
            deletedIds.push(id);
          } else {
            errorIds.push(id);
          }
        } catch (error) {
          errorIds.push(id);
          console.error(`Ошибка удаления ID ${id}:`, error);
        }
      }
      await client.query('COMMIT');
      return {
        success: errorIds.length === 0,
        message:
          errorIds.length > 0
            ? `Некоторые элементы не были удалены`
            : 'Все элементы успешно удалены',
        deletedIds,
        errorIds,
      };
    } catch (error) {
      console.error('Ошибка обмена данных:', error);
      await client.query('ROLLBACK');
      return {
        success: false,
        message: 'Transaction failed',
        deletedIds: [],
        errorIds: ids,
      };
    } finally {
      client.release();
    }
  }

  async createNewData(
    data: CreateDatabaseDto,
    tableName: string,
  ): Promise<CreateDataResponse> {
    const client = await this.pool.connect();
    try {
      const fields = Object.keys(data)
        .map((key) => `${this.reverseDictionary[tableName][key]}`)
        .join(', ');

      const values = Object.keys(data)
        .map((key) => `'${data[key]}'`)
        .join(', ');
      const query = `INSERT INTO ${tableName} (${fields}) VALUES (${values})`;
      await client.query(query);
      return {
        success: true,
      };
    } catch (error) {
      console.error('Ошибка обмена данных:', error);
      return { success: false };
    } finally {
      client.release();
    }
  }

  async getAll(tableName: string) {
    const client = await this.pool.connect();
    try {
      const dataQuery = `
      SELECT *
      FROM ${tableName}
    `;

      const dataRes = await client.query(dataQuery);

      const fields = dataRes.fields.map(
        (e) => this.dictionary['stat_data'][e.name],
      );

      const rows = dataRes.rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          newRow[this.dictionary['stat_data'][key]] = row[key] as string;
        }
        return newRow;
      });
      return { rows, fields };
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Failed to fetch government data');
    } finally {
      client.release();
    }
  }
}
