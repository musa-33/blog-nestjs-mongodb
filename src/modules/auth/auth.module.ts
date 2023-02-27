import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule, 
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LocalStrategy, AuthService, AuthenticatedGuard],
  controllers: [AuthController],
  exports: [AuthenticatedGuard]
})
export class AuthModule {}
