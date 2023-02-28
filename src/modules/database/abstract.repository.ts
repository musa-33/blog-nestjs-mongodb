import { PagerDto } from '@lib/http-infra-lib/dtos/pager.dto';
import { BasePagination } from '@lib/http-infra-lib/response/base-pagination';
import { PagerResult } from '@lib/http-infra-lib/response/pager-result.interface';
import { User } from '@modules/users/schemas/user.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { filter } from 'rxjs';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> extends BasePagination<TDocument>{
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {super()}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findAndPagination(filterQuery: FilterQuery<TDocument>, pagerDto: PagerDto): Promise<PagerResult<TDocument>>{
    const findQuery = this.model
      .find(filterQuery, {}, {lean: true})
      .skip(this.getSkip(pagerDto))
      .limit(this.getTake(pagerDto))
    const results = await findQuery
    
    const count = await this.model.count(filterQuery)
    return this.getPagerResult(results, count, pagerDto)
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true })
  }
}
