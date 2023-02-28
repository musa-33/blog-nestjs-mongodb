import { Injectable, Logger, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { CreateUserDto } from '../dtos/user-create.dto';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/user-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name)
  constructor(
    // private readonly usersRepository: UsersRepository,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUserData(createUserDto);
    let createdDocument =await this.userModel.create({
      ...createUserDto,
      _id: new Types.ObjectId(),
    });
    createdDocument = (createdDocument as any).toObject();
    return { ...createdDocument }
  }

  private async validateCreateUserData(createUserDto: CreateUserDto) {
    let user: User;
    try {
      user = await this.findUser({
        email: createUserDto.email,
      });
    } catch (err) { }
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.findUser({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return userDocument
  }

  async findUser(filterQuery: FilterQuery<User>): Promise<User>{
    const user = await this.userModel.findOne(filterQuery)
    if (!user) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return user
  }

  async login(email: string): Promise<User>{
    const user = await this.userModel.findOne({email}).select('+password')
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<User>{
    let createdDocument = await this.findUser({_id})
    createdDocument = (createdDocument as any).toObject();
    
    return await this.findAndUpdate({ _id }, { ...createdDocument, ...updateUserDto})
  }

  async findAndUpdate(
    filterQuery: FilterQuery<User>,
    update: UpdateQuery<User>,
  ) {
    const document = await this.userModel.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
}
