import { CacheModule, DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class RedisModule {
  static register(): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        CacheModule.registerAsync({
          inject:[ConfigService],
          useFactory: (configService: ConfigService) => ({
            ttl: 120,
            
          }),
        })
      ],
      exports: [],
    };
  }
}
