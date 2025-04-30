/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';

import { DeleteMultipleDto, DeleteResponse } from './dto/delete-some.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Injectable()
export class DatabaseService {
  removeSome(ids: string[], tableName: string, idField: string) {
    throw new Error('Method not implemented.');
  }
  private pool: Pool;
  private dictionary: { [key: string]: { [key: string]: string } };

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

  update(id: number, updateDatabaseDto: UpdateDatabaseDto) {
    return `This action updates a #${id} database`;
  }

  // async remove(id: number, tableName: string, idField: string) {
  //   const client = await this.pool.connect();
  //   try {
  //     const dataQuery = `DELETE FROM ${tableName} WHERE ${idField} = $1`;
  //     const result = await client.query(dataQuery, [id]);
  //     if (!result) throw Error('Ошибка результата');
  //     return {
  //       success: true,
  //       message: 'DELETE IS OK',
  //       deletedId: id,
  //     };
  //   } catch (error) {
  //     throw new Error(`'${tableName}' ${error}`);
  //   } finally {
  //     client.release();
  //   }
  // }

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
}
