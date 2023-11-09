import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const funcionariosController = express.Router();

funcionariosController.get('/', async (req, res) => {
    try{
        const funcionarios = await prisma.funcionario.findMany();
        res.status(200).json(funcionarios);
    }catch(error){
        res.json({error: error.message});
    }
});

export default funcionariosController;
