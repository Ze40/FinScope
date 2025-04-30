import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import { DatabaseService } from './database.service';
import { UpdateDatabaseDto } from './dto/update-database.dto';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  getAll() {
    return this.databaseService.getAll();
  }

  @Get('data')
  getData(@Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    return this.databaseService.getData({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDatabaseDto: UpdateDatabaseDto,
  ) {
    return this.databaseService.update(+id, updateDatabaseDto);
  }

  // @Delete(':id')
  // remove(
  //   @Param('id') id: string,
  //   @Headers('TableName') tableName: string,
  //   @Headers('IdFiled') idField: string,
  // ) {
  //   return this.databaseService.remove(+id, tableName, idField);
  // }

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
}
