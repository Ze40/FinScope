import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !(process.env.MODE_ENV !== 'dev'),
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
