import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeORMRepositoriesArray } from 'config/entities.array';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forFeature(TypeORMRepositoriesArray),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
