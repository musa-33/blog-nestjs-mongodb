import { AllExceptionsFilter } from '@lib/http-infra-lib/exceptions/all-exceptions.filter';
import { setupValidationPipe } from '@lib/http-infra-lib/exceptions/setup-validation-pipe.method';
import { ArticleModule } from '@modules/article/article.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CommentsModule } from '@modules/comment/comment.module';
import { DatabaseModule } from '@modules/database/database.module';
import { RmqModule } from '@modules/rmq/rmq.module';
import { UsersModule } from '@modules/users/users.module';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from '@modules/elasticsearch/elasticsearch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    RmqModule,
    // SearchModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ArticleModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useValue: setupValidationPipe(),
    }
  ],
})
export class AppModule {}
