import { UserService } from '@modules/users/services/user.service'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AuthenticatedGuard extends AuthGuard('local') implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
    private jwtService: JwtService
    ) { super() } 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    if (request.get('authorization') === undefined) {
      throw new UnauthorizedException()
    }
    const accessToken = request.get('authorization').replace('Bearer', '').trim()
    
    const verifiedToken = await this.jwtService.verify(accessToken, {
      secret: this.configService.get('JWT_SECRET'),
    })
    
    request.user = {
      _id: verifiedToken.id,
      email: verifiedToken.email,
      name: verifiedToken.name
    }
    
    return verifiedToken ?? true
  }
}
