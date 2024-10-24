// EsmaltacaoService.js

import { prismaClient } from "../database/prismaClient.js";

export class EsmaltacaoService {
    async createEsmaltacao(esmaltacaoData) {
        try {
            const esmaltacao = await prismaClient.esmaltacao.create({
                data: {
                    foto: esmaltacaoData.foto,
                    esmalte_id: esmaltacaoData.esmalte_id,
                    nome: esmaltacaoData.nome,
                    notas: esmaltacaoData.notas,
                },
            });
            return esmaltacao;
        } catch (error) {
            console.error("Error creating esmaltacao: ", error);
            throw new Error("Failed to create esmaltacao.");
        }
    }


    async getAll() {
        try {
            const esmaltacoes = await prismaClient.esmaltacao.findMany();
            return esmaltacoes;
        } catch (error) {
            console.error("Error getting all esmaltacoes: ", error);
            throw new Error("Failed to get all esmaltacoes.");
        }
    }

    async getById(id) {
        try {
            const esmaltacao = await prismaClient.esmaltacao.findUnique({
                where: { id: parseInt(id) },
            });

        if (!esmaltacao) throw new Error("Esmaltação não encontrada.");
            return esmaltacao;
        } catch (error) {
            console.error("Erro ao buscar esmalte pelo ID: ", error);
            throw new Error("Erro ao buscar esmalte pelo ID.");
        }
    }
}


/*
model esmaltacao {
  id         Int      @id @default(autoincrement())
  foto       String   @db.VarChar(255)
  esmalte_id Int?
  nome       String?  @db.VarChar(255)
  notas      String?
  esmalte    esmalte? @relation(fields: [esmalte_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
}
  */