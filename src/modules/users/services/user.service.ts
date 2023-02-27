import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { CreateUserDto } from '../dtos/user-create.dto';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dtos/user-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUserData(createUserDto);
    const userDocument = await this.usersRepository.create({...createUserDto});
    return userDocument
  }

  private async validateCreateUserData(createUserDto: CreateUserDto) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: createUserDto.email,
      });
    } catch (err) { }
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return userDocument
  }

  async findUser(email: string): Promise<User>{
    const user = await this.usersRepository.findOne({email})
    if (!user) {
      throw new NotFoundException('User not found.');
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
    const user = await this.usersRepository.findOne({_id})
    return await this.usersRepository.findOneAndUpdate({_id}, {...user, ...updateUserDto})
  }
}
