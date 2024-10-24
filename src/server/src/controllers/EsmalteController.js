import EsmalteService from "../services/EsmalteService.js";


export class EsmalteController {
async createEsmalte(req, res) {
    try {
        const { nomeesmalte, marca, cor, tipoesmalte, notas } = req.body;
        console.log('Dados recebidos para criação:', req.body);

        if (!req.file) {
            return res.status(400).json({ error: 'Imagem não enviada.' });
        }
        
        const fotosUrl = req.file.path;

        const esmalte = await EsmalteService.createEsmalte({
            nomeesmalte,
            marca,
            cor,
            tipoesmalte,
            notas,
            fotos: fotosUrl
        });

        return res.status(201).json(esmalte);
    } catch (error) {
        console.error('Erro ao tentar criar esmalte:', error);
        return res.status(500).json({ error: 'Ocorreu um erro ao tentar criar o esmalte.' });
    }
}


    async updateEsmalte(req, res) {
        try {
            const { id } = req.params;
            const esmalteData = req.body;
            const updateEsmalte = await EsmalteService.updateEsmalte(id, esmalteData);

            if (updateEsmalte) {
                return res.status(200).json({ message: 'Esmalte atualizado com sucesso.', esmalte: updateEsmalte });
            } else {
                return res.status(404).json({ message: `Esmalte com ID ${id} não encontrado.` });
            }
        } catch (error) {
            console.error('Erro ao tentar atualizar esmalte: ', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao tentar atualizar o esmalte.' });
        }
    }

    async deleteEsmalte(req, res) {
        try {
            const { id } = req.params;
            const deletedEsmalte = await EsmalteService.deleteEsmalte(id);

            if (deletedEsmalte) {
                return res.status(200).json({ message: 'Esmalte excluído com sucesso.', esmalte: deletedEsmalte });
            } else {
                return res.status(404).json({ message: `Esmalte com ID ${id} não encontrado.` });
            }
        } catch (error) {
            console.error('Erro ao tentar excluir esmalte: ', error);
            return res.status(500).json({
                message: 'Não foi possível deletar o esmalte',
                error: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const esmaltes = await EsmalteService.getAll();
            res.status(200).json(esmaltes);
        } catch (error) {
            console.error('Erro ao tentar buscar todos os esmaltes: ', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao tentar buscar os esmaltes.' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;

            if (isNaN(parseInt(id))) {
                return res.status(400).json({ message: 'ID inválido.' });
            }

            const esmalte = await EsmalteService.getById(id);

            if (esmalte) {
                return res.status(200).json(esmalte);
            } else {
                return res.status(404).json({ message: `Esmalte com ID ${id} não encontrado.` });
            }
        } catch (error) {
            console.error('Erro ao tentar buscar esmalte por ID: ', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao tentar buscar o esmalte.' });
        }
    }
}

export default new EsmalteController();
