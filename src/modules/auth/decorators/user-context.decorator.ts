import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'

export const GetUserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest()
    
    if (!request.user) throw new UnauthorizedException()
    const user = request.user
    
    return user
  },
)
