import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';

import { UpdateDatabaseDto } from './dto/update-database.dto';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(configService: ConfigService) {
    const config: PoolConfig = {
      user: configService.getOrThrow('DB_USERNAME'),
      host: configService.getOrThrow('DB_HOST'),
      database: configService.getOrThrow('DB_DATABASE'),
      password: configService.getOrThrow('DB_PASSWORD'),
      port: configService.getOrThrow('DB_PORT'),
    };
    this.pool = new Pool(config);
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

  async getAll(): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM goverment');
      return result.rows;
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

      const fields = dataRes.fields.map((e) => e.name);
      return { rows: dataRes.rows, fields };
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

  async remove(id: number, tableName: string, idField: string) {
    const client = await this.pool.connect();
    try {
      const dataQuery = `DELETE FROM ${tableName} WHERE ${idField} = $1`;
      const result = await client.query(dataQuery, [id]);
      if (!result) throw Error('Ошибка резудьтата');
      return {
        success: true,
        message: 'DELETE IS OK',
        deletedId: id,
      };
    } catch (error) {
      throw new Error(`Permission denied for table '${tableName}' ${error}`);
    } finally {
      client.release();
    }
  }
}
