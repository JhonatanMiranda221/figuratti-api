import { TypeOrmModule } from "@nestjs/typeorm";
import { FigurinhaController } from "./controllers/figurinha.controller";
import { FigurinhaEntity } from "./entities/figurinha.entity";
import { FigurinhaService } from "./services/figurinha.service";
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FigurinhaEntity,
    ]),
  ],
  controllers: [FigurinhaController],
  providers: [FigurinhaService],
})
export class FigurinhaModule {}