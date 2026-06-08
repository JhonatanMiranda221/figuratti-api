import { FigurinhaEntity } from "../figurinha/entities/figurinha.entity";
import { UsuarioEntity } from "../usuario/entities/usuario.entity";
import { ColecaoController } from "./controllers/colecao.controller";
import { ColecaoFigurinhaEntity } from "./entities/colecao.entity";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColecaoService } from "./services/colecao.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ColecaoFigurinhaEntity,
      UsuarioEntity,
      FigurinhaEntity,
    ]),
  ],
  controllers: [ColecaoController],
  providers: [ColecaoService],
})
export class ColecaoModule {}