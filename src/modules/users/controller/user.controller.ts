import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/user-create.dto';
import { SuccessResponse } from '@lib/http-infra-lib/response/success-response.interface';
import { ResponseUtil } from '@lib/http-infra-lib/utils/response.util';
import { UserContext } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dtos/user-update.dto';
import { AuthenticatedGuard } from '@modules/auth/guards/authenticated.guard';
import { GetUserContext } from '@modules/auth/decorators/user-context.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService
  ) { }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<SuccessResponse<{name: string, email: string}>> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const result = await this.usersService.createUser({...createUserDto, password: hashedPassword});
    const {password, _id, ...user} = result
    return ResponseUtil.success(user, 'User has been registered successfully.')
  }

  @UseGuards(AuthenticatedGuard)
  @Patch()
  async updateUser(
    @GetUserContext() user: UserContext,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<SuccessResponse<{ name: string, email: string }>> {
    const usr = await this.usersService.updateUser(user._id, updateUserDto) 
    return ResponseUtil.success(usr, 'User profile has been updated successfully.')
  }
}
