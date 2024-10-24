// EsmaltacaoController.js

import  {EsmaltacaoService}  from "../services/EsmaltacaoService.js";

export class EsmaltacaoController {

    
    async createEsmaltacao(req, res) {
        try {
            const esmaltacaoData = req.body;
            const esmaltacaoService = new EsmaltacaoService();

            if (!req.file) {
                return res.status(400).json({ error: "Imagem não enviada." });
            }

            const fotosUrl = req.file.path;

            const esmaltacao = await esmaltacaoService.createEsmaltacao({
                nomeEsmaltacao: esmaltacaoData.nomeEsmaltacao,
                marca: esmaltacaoData.marca,
                cor: esmaltacaoData.cor,
                tipoEsmaltacao: esmaltacaoData.tipoEsmaltacao,
                notas: esmaltacaoData.notas,
                foto: fotosUrl,
            });

            return res.status(201).json(esmaltacao);
        } catch (error) {
            console.error("Error creating esmaltacao: ", error);
            return res.status(500).json({ error: "Failed to create esmaltacao." });
        }
    }


    async getById(req, res) {
        try {
            const {id} = req.params;
            const esmaltacaoService = new EsmaltacaoService();


            if (isNaN(parseInt(id))) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const esmaltacao = await esmaltacaoService.getById(id);

            if (esmaltacao) {
                return res.status(200).json(esmaltacao);
            } else { 
                return res.status(404).json({ message: `Esmaltacao com ID ${id} não encontrado.` });
            }
        } catch (error) {
            console.error("Erro ao tentar buscar esmaltação por ID: ", error);
            return res.status(500).json({ error: "Erro ao tentar buscar esmaltação por ID" });
        }

    }


    async getAll(req, res) {
        try {
            const esmaltacaoService = new EsmaltacaoService();
            const esmaltacoes = await esmaltacaoService.getAll();
            return res.status(200).json(esmaltacoes);
        } catch (error) {
            console.error("Erro ao tentar buscar todos as esmaltações: ", error);
            return res.status(500).json({ error: "Erro ao tentar buscar todos as esmaltações" });
        }
    }
}

export default new EsmaltacaoController();