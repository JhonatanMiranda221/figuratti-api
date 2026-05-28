import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//AppModule
// inicia a aplicação
// conecta módulos
// monta a arquitetura
// Então tudo começa aqui.

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        host: config.get<string>('DB_HOST'),

        port: Number(config.get<string>('DB_PORT')),

        username: config.get<string>('DB_USER'),

        password: config.get<string>('DB_PASS'),

        database: config.get<string>('DB_NAME'),

        entities: [__dirname + '/**/*.entity{.ts,.js}'],

        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
