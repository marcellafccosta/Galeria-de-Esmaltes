import { Router } from "express";
import { UsuarioRoutes } from "../routes/UsuarioRoutes.js";
import { EsmalteRoutes } from "../routes/EsmalteRoutes.js";
import { EsmaltacaoRoutes } from "./EsmaltacaoRoutes.js";

const routes = Router();

routes.use('/usuario', UsuarioRoutes);
routes.use('/esmalte', EsmalteRoutes);
routes.use('/esmaltacao', EsmaltacaoRoutes);


export default routes;