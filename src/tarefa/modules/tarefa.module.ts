/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TarefaController } from "src/controllers/tarefa.controller";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefa.service";



@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  providers: [TarefaService],
  controllers: [TarefaController],
  exports: [TypeOrmModule]
})

export class TarefaModule {}