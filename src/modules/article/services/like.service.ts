import { SELECT } from '@lib/http-infra-lib/utils/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateLikeDto } from '../dtos/like-create.dto';
import { Like } from '../schemas/like.schema';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) { }

  async checkLikeArticle(user: string, article: string): Promise<Like> {
    return  await this.likeModel.findOne({ user, article })
  }

  async createLikeArticle(likeData: CreateLikeDto): Promise<Like> {
    const data =  this.likeModel.create({
      _id: new Types.ObjectId(),
      ...likeData
    });
    // if (!data) throw new BadRequestException('can\'t like this article please try again');
    return data
  }

  async unLikeArticle(filterQuery: FilterQuery<Like>) {
    const data = await this.likeModel.findOneAndDelete(filterQuery)
    if (!data) throw new BadRequestException('can\'t unLiked this article');
    return data
  }

  async getAllArticleUserLiked(user: string): Promise<Like[]> {
    const data =  await this.likeModel.find({ user }).populate({ path: 'article', select: `${SELECT} -user` }).select(SELECT)
    if (data && data.length == 0) throw new NotFoundException(`there is no article that user liked.`);
    return data
  }
}
