import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {}
