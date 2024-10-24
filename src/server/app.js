import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './src/routes/routes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
  });

export default app;
