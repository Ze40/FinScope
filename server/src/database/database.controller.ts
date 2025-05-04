import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';

import { DatabaseService } from './database.service';
import { CreateDatabaseDto } from './dto/create-database.dto';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('all')
  getAll(@Headers('TableName') tableName: string) {
    return this.databaseService.getAll(tableName);
  }

  @Get('fields')
  getFields(@Headers('TableName') tableName: string) {
    return this.databaseService.getFileds(tableName);
  }

  @Get('data')
  getData(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Headers('TableName') tableName: string,
  ) {
    return this.databaseService.getData({ page, limit, tableName });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('TableName') tableName: string) {
    return this.databaseService.findOne(+id, tableName);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Headers('TableName') tableName: string,
    @Body() updateDatabaseDto: UpdateDatabaseDto,
  ) {
    return this.databaseService.update(tableName, +id, updateDatabaseDto);
  }

  @Delete('delete/:id')
  remove(
    @Param('id') id: string,
    @Headers('TableName') tableName: string,
    @Headers('IdFiled') idField: string,
  ) {
    return this.databaseService.remove(+id, tableName, idField);
  }

  @Delete('delete-some')
  removeSome(
    @Body() body: { ids: string[] },
    @Headers('TableName') tableName: string,
    @Headers('IdField') idField: string,
  ) {
    return this.databaseService.deleteSome({
      ids: body.ids,
      tableName: tableName,
      idField: idField,
    });
  }

  @Put('add')
  createNewData(
    @Body() newData: CreateDatabaseDto,
    @Headers('TableName') tableName: string,
  ) {
    return this.databaseService.createNewData(newData, tableName);
  }
}
