import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class SingleQueryParams<T = any> {
  @IsOptional()
  @Type(() => Object)
  relation?: FindOptionsRelations<T>;

  @IsOptional()
  @Type(() => Object)
  select?: FindOptionsSelect<T>;

  @IsOptional()
  @Type(() => Object || Array)
  filter?: FindOptionsWhere<T>[] | FindOptionsWhere<T>;
}

export class QueryParams<T = any> extends SingleQueryParams<T> {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  take?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @Type(() => Object)
  sort?: object;

  @IsOptional()
  title?: string;
}

export class ChartQueryParams {
  @IsOptional()
  type?: 'daily' | 'monthly' | 'yearly' = 'daily';
}
