const express = require('express');
const app = express();
const link = 'http://localhost:3000';
app.use(express.static('public'));
app.listen(3000, () => console.log(`Servidor rodando em ${link}`));
