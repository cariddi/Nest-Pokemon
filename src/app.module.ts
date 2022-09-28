import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigutarion } from './config/env.config';
import { JoiValidationSchema } from './config/joi.schemaValidation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigutarion],
      validationSchema: JoiValidationSchema,
    }), // must be placed on top
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
