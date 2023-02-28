import { userStub } from "../../test/stubs/user.stub";

export const UserService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  validateUser: jest.fn().mockResolvedValue(userStub()),
  findUser: jest.fn().mockResolvedValue(userStub()),
  login: jest.fn().mockResolvedValue(userStub()),
})