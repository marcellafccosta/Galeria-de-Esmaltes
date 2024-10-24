import { Router } from "express";
import { UsuarioRoutes } from "../routes/UsuarioRoutes.js";
import { EsmalteRoutes } from "../routes/EsmalteRoutes.js";

const routes = Router();

routes.use('/usuario', UsuarioRoutes);
routes.use('/esmalte', EsmalteRoutes);


export default routes;