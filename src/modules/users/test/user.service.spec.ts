import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose";
import { UserController } from "../controller/user.controller";
import { CreateUserDto } from "../dtos/user-create.dto";
import { UpdateUserDto } from "../dtos/user-update.dto";
import { User } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { userStub } from "./stubs/user.stub";
import { UserModel } from "./supports/user.model";

jest.mock('../services/user.service')

describe('UserService', () => {
  let userService: UserService
  let userModel: UserModel
  let userFilterQuery: FilterQuery<User>

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UserService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useClass: UserModel
        }
      ]
    })
    .compile();

    userService = moduleRef.get<UserService>(UserService)
    userModel = moduleRef.get<UserModel>(getModelToken(User.name))

    userFilterQuery = {
      _id: userStub()._id
    }

    jest.clearAllMocks();
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: any;
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          name: userStub().name,
          password: userStub().password
        }
        user = await userService.createUser(createUserDto)
      })

      test('then it should call userModel', () => {
        expect(userService.createUser).toHaveBeenCalledWith({...createUserDto});
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })


  describe('findUser', () => {
    describe('when findUser is called', () => {
      let user: User;

      beforeEach(async () => {
        jest.spyOn(userService, 'findUser')
        user = await userService.findUser(userFilterQuery)
      })

      test('then it should call usersService', () => {
        expect(userService.findUser).toBeCalledWith(userFilterQuery);
      })

      test('then is should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  })


  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto

      beforeEach(async () => {
        updateUserDto = {
          name: userStub().name
        }
        user = await userService.updateUser(userStub().userId, updateUserDto);
      })

      test('then it should call the userModel', () => {
        expect(userService.updateUser).toHaveBeenCalledWith(userStub().userId, updateUserDto);
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })
})