import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from 'supertest';
import { AppModule } from "../src/app.module";

describe('Testes das tarefas (e2e)', () => {
  let app: INestApplication;

  let idTarefa: number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_todolist_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),

        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Teste 1 - Criando uma nova tarefa no banco de dados', async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        nome: 'Assistir aula',
        descricao: 'Task prioritária',
        responsavel: 'Bruna Xavier',
        data: '2022-09-15',
        status: true
      })
      .expect(201)

      idTarefa = response.body.id

  })

  it(' Teste 2 - Buscar uma tarefa específica', async () => {
    return request(app.getHttpServer())
      .get(`/tarefa/` + idTarefa)
      .expect(200)
  })

  it('Teste 3 - Atualizar uma tarefa', async () => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 1,
        nome: 'Assistir aula - Concluída',
        descricao: 'Task prioritária realizada',
        responsavel: 'Bruna Xavier',
        data: '2022-09-15',
        status: true
      })
      .expect(200)
      .then(response => {
        expect('Assistir aula - Concluída').toEqual(response.body.nome)
        expect('Task prioritária realizada').toEqual(response.body.descricao)
      })
  })

  it(' Teste 4 - Verificar erro 404 ()', async () => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 73,
        nome: 'Assistir aula - Concluída',
        descricao: 'Task prioritária realizada',
        responsavel: 'Bruna Xavier',
        data: '2022-09-15',
        status: true
      })
      .expect(404)
  })

  it('Teste 5 - Deletar uma tarefa do banco', async () => {
      return request(app.getHttpServer())
      .delete(`/tarefa/` + idTarefa)
      .expect(204)
  })

  afterAll(async () => {
    await app.close()
  })

})
 


