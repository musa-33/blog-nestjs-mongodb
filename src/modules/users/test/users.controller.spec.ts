import { Test } from "@nestjs/testing"
import { UserController } from "../controller/user.controller"
import { CreateUserDto } from "../dtos/user-create.dto"
import { User } from "../schemas/user.schema"
import { UserService } from "../services/user.service"
import { userStub } from "./stubs/user.stub"
import { UserContext } from '../interfaces/user.interface'
import { UsersRepository } from "../repositories/user.repository"
import { DatabaseModule } from "@modules/database/database.module"

jest.mock('../users.service')

describe('UsersController', () => {
  let userController: UserController
  let userService: UserService
  let usersRepository: UsersRepository
  let databaseModule: DatabaseModule

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UserController],
      providers: [UserService, UsersRepository]
    }).compile()

    userController = moduleRef.get<UserController>(UserController)
    userService = moduleRef.get<UserService>(UserService)
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository)
    databaseModule = moduleRef.get<DatabaseModule>(DatabaseModule)
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: any
      let createUserDto: CreateUserDto

      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          name: userStub().name,
          password: userStub().name
        }
        user = await userController.createUser(createUserDto);
      })

      test('then it should call usersService', () => {
        expect(userService.createUser).toHaveBeenCalledWith(createUserDto.email, createUserDto.name);
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })
})