import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ColecaoService } from '../services/colecao.service';
import { UpdateColecaoDto } from '../dto/update-colecao.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('colecao')
export class ColecaoController {
  constructor(
    private readonly colecaoService: ColecaoService,
  ) {}

  @Patch(':figurinhaId')
  atualizarStatus(
    @Request() req,
    @Param('figurinhaId') figurinhaId: number,
    @Body() dto: UpdateColecaoDto,
  ) {
    return this.colecaoService.atualizarStatus(
      req.user.id,
      Number(figurinhaId),
      dto,
    );
  }

  @Get()
  listarColecao(@Request() req) {
    return this.colecaoService.listarColecao(
      req.user.id,
    );
  }

  @Get('repetidas')
  listarRepetidas(@Request() req) {
    return this.colecaoService.listarRepetidas(
      req.user.id,
    );
  }

  @Get('stats')
  obterEstatisticas(@Request() req) {
    return this.colecaoService.obterEstatisticas(
      req.user.id,
    );
  }
}