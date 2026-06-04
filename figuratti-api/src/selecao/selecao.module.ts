import { TypeOrmModule } from "@nestjs/typeorm";
import { SelecaoController } from "./controllers/selecao.controller";
import { SelecaoEntity } from "./entities/selecao.entity";
import { SelecaoService } from "./services/selecao.service";
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SelecaoEntity,
    ]),
  ],
  controllers: [SelecaoController],
  providers: [SelecaoService],
})
export class SelecaoModule {}