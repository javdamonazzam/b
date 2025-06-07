import { DeepPartial, Repository } from 'typeorm';
import { PaginateData, QueryParams, SingleQueryParams } from 'src/base';
import { NotFoundException } from '@nestjs/common';
// import { I18nContext } from 'nestjs-i18n';
// import { I18nTranslations } from 'src/translate/generated/i18n.generated';
// import { UserInfoType } from 'src/auth/types/user-info.type';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export abstract class BaseCrudService<T> {
  protected constructor(protected repository: Repository<T | any>) {}

  async create(body: DeepPartial<T>): Promise<T> {
    const model = this.repository.create(body);
    return await this.repository.save(model);
  }
  async findOneByWithNull(obj: Partial<T>): Promise<T> {
    return this.repository.findOneBy(obj);
  }

  async findOneById(id: number): Promise<T> {
    const model = await this.repository.findOneBy({ id });
    if (!model) throw new NotFoundException('یافت نشد');
    return model;
  }
  async findOneWithNull(obj: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(obj);
  }

  async findAllNoPagination(query: QueryParams) {
    return this.repository.find(query);
  }

  parseBooleanValues(obj: any): any {
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map(this.parseBooleanValues);
      } else {
        const result: any = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (
              typeof value === 'string' &&
              (value === 'true' || value === 'false')
            ) {
              result[key] = value === 'true';
            } else {
              result[key] = this.parseBooleanValues(value);
            }
          }
        }
        return result;
      }
    } else {
      return obj;
    }
  }
  async findAll(query: QueryParams): Promise<FindAll<T>> {
    const { page, take, filter } = query;
    let pagenumber = page ? page : 0;
    const count = await this.repository.count({ where: filter });
    const data = await this.repository.find({
      take,
      skip: pagenumber * take ? take : 0,
      where: filter,
      order: { id: -1 },
    });

    return PaginateData(data, page, take, count);
  }

  async findOneBy(obj: Partial<T>): Promise<T> {
    console.log(obj);
    
    const result = await this.repository.findOneBy(obj);
    console.log(result);
    
    if (!result) throw new NotFoundException('');
    
    return result;
  }
  async findByUsername(username:string) {
    
    const result = await this.repository.findOneBy({username:username});
    
    if (!result) throw new NotFoundException('');
    
    return result;
  }

  async findOneByWithQuery(
    query: SingleQueryParams<T>,
    withValidation: boolean,
  ) {
    const result = await this.repository.findOne({
      where: query.filter,
      relations: query.relation,
      select: query.select,
    });
    if (withValidation && !result) throw new NotFoundException('');
    return result;
  }

  async findOne(
    id: number,
    query?: SingleQueryParams<T>,
    withDeleted?: boolean,
  ): Promise<T> {
    const filter = query?.filter ?? {};
console.log("find",id);

    if (query?.relation)
      query.relation = this.parseBooleanValues(query?.relation);

    const result = await this.repository.findOne({
      where: { id, ...filter },
      relations: query?.relation,
      select: query?.select,
      withDeleted: withDeleted,
    });
    

    if (!result) {
      throw new NotFoundException('');
    }
    return result;
  }

  async update(id: number, body: Partial<T>) {
    body = { ...body };
    await this.repository.update(id, body);
    return this.findOne(Number(id));
  }

  async updateWithoutValidation(id: number, body: Partial<T>) {
    body = { ...body, updatedAt: new Date().getTime() };
    return this.repository.update(id, body);
  }

  async hardDelete(id: number) {
    const model = await this.findOne(id);
    await this.repository.delete(id);
    return model;
  }

  async softDelete(id: number) {
    const model = await this.findOne(id);
    await this.repository.softDelete(id);
    return model;
  }
}
