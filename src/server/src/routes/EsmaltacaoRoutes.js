import { Router } from "express";
import upload from "../config/upload.js";
import { EsmaltacaoController } from "../controllers/EsmaltacaoController.js";


const router = Router();
const esmaltacaoController = new EsmaltacaoController();

router.post('/', upload.single('foto'), esmaltacaoController.createEsmaltacao);

router.get('/', (req, res) => esmaltacaoController.getAll(req, res));
router.get('/:id', (req, res) => esmaltacaoController.getById(req, res));
// router.put('/:id', (req, res) => esmaltacaoController.updateEsmaltacao(req, res));
// router.delete('/:id', (req, res) => esmaltacaoController.deleteEsmaltacao(req, res));

export { router as EsmaltacaoRoutes };
