import { userStub } from "@modules/users/test/stubs/user.stub";


export const UsersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub()),
})