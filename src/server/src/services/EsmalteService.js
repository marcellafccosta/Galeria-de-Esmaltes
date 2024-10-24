import { prismaClient } from "../database/prismaClient.js";

export class EsmalteService {
   // Serviço: Função para criar um novo esmalte no banco de dados
   async createEsmalte(esmalteData) {
    try {
        // Desestruture as propriedades do objeto esmalteData
        const { nomeesmalte, marca, cor, tipoesmalte, fotos, notas } = esmalteData;

        const esmalte = await prismaClient.esmalte.create({
            data: {
                nomeesmalte,
                marca,
                cor,
                tipoesmalte,
                fotos,
                notas
            }
        });

        return esmalte;
          
    } catch (error) {
        throw new Error("Erro ao cadastrar esmalte: " + error.message);
    }
}



    async getAll() {
        try {
            const esmaltes = await prismaClient.esmalte.findMany();
            return esmaltes;
        } catch (error) {
            throw new Error("Erro ao buscar esmaltes: " + error.message);
        }
    }

    async getById(id) {
        try {
            const esmalte = await prismaClient.esmalte.findUnique({
                where: { id: parseInt(id) },
            });

            if (!esmalte) throw new Error("Esmalte não encontrado");
            return esmalte;
        } catch (error) {
            throw new Error("Erro ao buscar esmalte pelo ID: " + error.message);
        }
    }

    async updateEsmalte(id, esmalteData) {
        try {
            const esmalteAtualizado = await prismaClient.esmalte.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nomeesmalte: esmalteData.nomeesmalte,
                    marca: esmalteData.marca,
                    cor: esmalteData.cor,
                    tipoesmalte: esmalteData.tipoesmalte,
                    fotos: esmalteData.fotos,
                    notas: esmalteData.notas || null
                }
            });

            return esmalteAtualizado;
        } catch (error) {
            throw new Error("Erro ao atualizar esmalte: " + error.message);
        }
    }

    async deleteEsmalte(id) {
        try {
            const esmalteDeletado = await prismaClient.esmalte.delete({
                where: {
                    id: parseInt(id)
                }
            });

            if (!esmalteDeletado) throw new Error("Esmalte não encontrado");
            return esmalteDeletado;
        } catch (error) {
            throw new Error("Erro ao deletar esmalte: " + error.message);
        }
    }
}

export default new EsmalteService();
