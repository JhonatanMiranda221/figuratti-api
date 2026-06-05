import { DataSource } from 'typeorm';
import { SelecaoEntity } from '../selecao/entities/selecao.entity';
import { FigurinhaEntity } from '../figurinha/entities/figurinha.entity';

import selecoesJson from './selecoes.json';
import figurinhasJson from './figurinhas.json';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_figuratti',
  entities: [SelecaoEntity, FigurinhaEntity],
});

async function runSeed() {
  await AppDataSource.initialize();

  const selecaoRepository =
    AppDataSource.getRepository(SelecaoEntity);

  const figurinhaRepository =
    AppDataSource.getRepository(FigurinhaEntity);

  await selecaoRepository.save(selecoesJson);

  for (const item of figurinhasJson) {
    const selecao = await selecaoRepository.findOne({
      where: {
        codigoFifa: item.selecao,
      },
    });

    if (!selecao) continue;

    await figurinhaRepository.save({
        numero: item.numero,
        nomeJogador: item.nomeJogador,
        posicao: item.posicao,
        especial: item.especial,
        categoria: item.categoria,
        selecao,
        });
  }

  console.log('Seed executado com sucesso');

  await AppDataSource.destroy();
}

runSeed();