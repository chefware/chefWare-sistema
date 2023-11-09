import express from 'express';
import funcionariosController from './backend/Funcionarios/funcionariosController.js';

const app = express();
const link = 'http://localhost:3000';

app.use(express.static('public'));
app.use(express.json());

app.use('/funcionarios', funcionariosController);

app.listen(3000, () => console.log(`Servidor rodando em ${link}`));

export default app;
