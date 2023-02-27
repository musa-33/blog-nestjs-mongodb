import { CREATED_AT_SELECT, NOTIFICATION, SELECT } from '@lib/http-infra-lib/utils/common';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { CreateCommentDto } from '../dtos/create-ticket.dto';
import { Comment } from '../schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(NOTIFICATION) private notificationClient: ClientProxy,
    @InjectModel(Comment.name) private commentsModel: Model<Comment>
  ) { }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentsModel.create({
      _id: new Types.ObjectId(),
      ...createCommentDto
    });
    if (!comment) throw new BadRequestException(`can't create comment on this articles with this _id = ${createCommentDto.article}`)
    const commentDetails = await this.getCommentById(comment._id.toString())
    await this.notificationClient.emit('comment_created', {
      comment: commentDetails
    })
    return commentDetails
  }

  async getCommentById(_id: string): Promise<Comment> {
    return await this.commentsModel.findById(_id).populate({ path: 'user article', select: `${SELECT} -user` }).select(CREATED_AT_SELECT)
  }
  
  async getAllCommentsOnArticles(article: string): Promise<Comment[]> {
    return await this.commentsModel.find({ article }).populate({ path: 'user article', select: `${SELECT} -user` }).select(SELECT)
  }
}
