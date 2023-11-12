import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const empresasController = express.Router();

empresasController.get('/', async (req, res) => {
    try {
        const empresas = await prisma.empresa.findMany();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(400).json(e);
    }
});

empresasController.get('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);
    try {
        const empresas = await prisma.empresa.findUnique({
            where: {
                id: idEmpresa
            }
        });

        if(empresas){
            res.status(200).json(empresas);
        } else {
            res.status(200).json("Não existe empresa com esse id");
        }

    } catch (error) {
        res.status(400).json(e);
    }
});

empresasController.post('/', async (req, res) => {
    try {
        const {
            nome,
            cnpj,
            endereco,
            telefone
        } = req.body;

        const empresaCriada = await prisma.empresa.create({
            data: {
                nome,
                cnpj,
                endereco,
                telefone
            }
        });

        res.status(201).json(empresaCriada);
    } catch (e) {
        res.status(500).json(e);
    }
});

empresasController.put('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);
    try {
        const {
            nome,
            cnpj,
            endereco,
            telefone
        } = req.body;

        const empresaAtualizada = await prisma.empresa.update({
            where: {
                id: idEmpresa
            },
            data: {
                nome,
                cnpj,
                endereco,
                telefone
            }
        });

        res.status(200).json(empresaAtualizada);
    } catch (e) {
        res.status(500).json(e);
    }
});

empresasController.delete('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);
    try {
        const empresaDeletada = await prisma.empresa.delete({
            where: {
                id: idEmpresa
            }
        });

        res.status(200).json(empresaDeletada);
    } catch (e) {
        res.status(500).json(e);
    }
});

export default empresasControllerController;
