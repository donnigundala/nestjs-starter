import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi = require('@hapi/joi');
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from 'config/app.config';
import databaseConfig from 'config/database.config';
import mailConfig from 'config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Use module globally (default: false)
      isGlobal: true,

      // load configuration file(s)
      load: [appConfig, databaseConfig, mailConfig],

      // HapiJoi Validation Schema
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
        APP_KEY: Joi.string(),
        APP_PORT: Joi.number(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class AppModule {}
