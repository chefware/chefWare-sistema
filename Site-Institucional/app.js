import express from 'express';
import funcionariosController from './backend/Funcionarios/funcionariosController.js';
import maquinasController from './backend/Maquinas/maquinasController.js';
import empresasController from './backend/Empresas/empresasController.js';
import dashboardController from './backend/Dashboard/dashboardController.js';
import componentesController from './backend/Dashboard/componenteController.js';
import historicoController from './backend/Dashboard/historicoController.js';
import dadosController from './backend/Dashboard/dadosController.js';
import unidadeMedidaController from './backend/Dashboard/unidadeMedidaController.js';

const app = express();
const link = 'http://localhost:3000';

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

app.listen(3000, () => console.log(`Servidor rodando em ${link}`));

export default app;
