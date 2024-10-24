import { Router } from "express";
import { EsmalteController } from "../controllers/EsmalteController.js";
import upload from "../config/upload.js";


const router = Router();
const esmalteController = new EsmalteController();

router.post('/', upload.single('fotos'), esmalteController.createEsmalte);

router.get('/', (req, res) => esmalteController.getAll(req, res));
router.get('/:id', (req, res) => esmalteController.getById(req, res));
router.put('/:id', (req, res) => esmalteController.updateEsmalte(req, res));
router.delete('/:id', (req, res) => esmalteController.deleteEsmalte(req, res));

export { router as EsmalteRoutes };
