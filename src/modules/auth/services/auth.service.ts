import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@modules/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, 
    private jwtService: JwtService) {}
 
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.login(username);
    
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {name: user.name, email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
