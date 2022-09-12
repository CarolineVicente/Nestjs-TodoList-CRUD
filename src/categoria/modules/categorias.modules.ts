import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "../controllers/categoria.controllers";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.services";

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [TypeOrmModule]
})
export class CategoriaModule{}