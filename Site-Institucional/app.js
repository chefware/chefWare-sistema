import express from 'express';
import https from 'https';
import fs from 'fs';
import funcionariosController from './backend/Funcionarios/funcionariosController.js';
import maquinasController from './backend/Maquinas/maquinasController.js';
import empresasController from './backend/Empresas/empresasController.js';
import dashboardController from './backend/Dashboard/dashboardController.js';
import componentesController from './backend/Dashboard/componenteController.js';
import historicoController from './backend/Dashboard/historicoController.js';
import dadosController from './backend/Dashboard/dadosController.js';
import unidadeMedidaController from './backend/Dashboard/unidadeMedidaController.js';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.use('/funcionarios', funcionariosController);
app.use('/empresas', empresasController);
app.use('/maquinas', maquinasController);
app.use('/dashboard', dashboardController);
app.use('/componentes', componentesController);
app.use('/historico', historicoController);
app.use('/unidades', unidadeMedidaController);
app.use('/dados', dadosController);

const privateKey = fs.readFileSync('./ssl/code.key', 'utf8');
const certificate = fs.readFileSync('./ssl/code.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Servidor rodando em HTTPS na porta ${port}`);
});

export default app;