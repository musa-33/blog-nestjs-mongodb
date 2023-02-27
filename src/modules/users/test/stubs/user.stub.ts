import { User } from "@modules/users/schemas/user.schema"
import { Types } from "mongoose"

export const userStub = (): User => {
  return {
    _id: new Types.ObjectId(),
    email: 'test@example.com',
    name: 'test',
    password: 'Test@1234'
  }
}