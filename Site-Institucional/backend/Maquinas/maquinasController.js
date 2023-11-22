import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const maquinasController = express.Router()

maquinasController.get('/page/:page', async (req, res) => {
    const take = 5;
    const page = Number(req.params.page) || 0;
    const skip = page * take;
    try {
        const [maquinas, total] = await prisma.$transaction([
            prisma.maquina.findMany({
                take: take,
                skip: skip,
            }),
            prisma.maquina.count()
        ]);

        const totalPaginas = Math.ceil(total / take);

        const resposta = {
            maquinas,
            totalPaginas,
            paginaAtual: page,
            totalEmpresas: total
        };

        res.status(200).json(resposta);

    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

maquinasController.get('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id)
    try {
        const maquinas = await prisma.maquina.findUnique({
            where: {
                id: idEmpresa
            }
        })

        if(maquinas){
            res.status(200).json(maquinas)
        } else {
            res.status(200).json("Não existe empresa com esse id")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

maquinasController.post('/', async (req, res) => {
    try {
        const {
            numSerie,
            nome,
            hostName,
            modelo,
            local,
            descComponentes,
            fkEmpresa
        } = req.body

        const maquinaCriada = await prisma.maquina.create({
            data: {
                numSerie,
                nome,
                hostName,
                modelo,
                local,
                descComponentes,
                fkEmpresa
            }
        })

        res.status(201).json(maquinaCriada)
    } catch (e) {
        res.status(500).json(e)
    }
})

maquinasController.patch('/:id', async (req, res) => {
    const idMaquina = Number(req.params.id)
    const {
        numSerie,
        nome,
        hostName,
        modelo,
        local,
        descComponentes,
        fkEmpresa
    } = req.body
    try {

        const maquinaAtualizada = await prisma.maquina.update({
            where: {
                idMaquina: idMaquina
            },
            data: {
                numSerie: numSerie,
                nome: nome,
                hostName: hostName,
                modelo: modelo,
                local: local,
                descComponentes: descComponentes,
                fkEmpresa: fkEmpresa
            }
        })

        res.status(200).json(maquinaAtualizada)
    } catch (e) {
        res.status(409).json(e)
    }
})

maquinasController.patch('/deletar/:id', async (req, res) => {
    const idMaquina = Number(req.params.id)
    await prisma.maquina.update({
        where: {
            idMaquina: idMaquina
        },
        data: {
            ativo: false
        }
    })

    res.status(204).send("Máquina deletada")
})


export default maquinasController
