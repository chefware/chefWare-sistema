import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const maquinasController = express.Router()

maquinasController.get('/', async (req, res) => {
    try {
        const maquinas = await prisma.maquina.findMany()
        res.status(200).json(maquinas)
    } catch (error) {
        res.status(400).json(e)
    }
})

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
        res.status(400).json(e)
    }
})

maquinasController.post('/', async (req, res) => {
    try {
        const {
            numSerie,
            nome,
            modelo,
            local,
            descComponentes,
            fkEmpresa
        } = req.body

        const maquinaCriada = await prisma.maquina.create({
            data: {
                numSerie,
                nome,
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
    const idEmpresa = Number(req.params.id)
    const { 
        numSerie, 
        nome, 
        modelo, 
        local, 
        descComponentes,
        fkEmpresa 
    } = req.body
    try {

        const maquinaAtualizada = await prisma.maquina.update({
            where: {
                id: idEmpresa
            },
            data: {
                numSerie: numSerie,
                nome: nome,
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

maquinasController.delete('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id)
    await prisma.maquina.delete({
        where: {
            id: idEmpresa
        }
    })

    res.status(204).send("Máquina deletada")
})


export default maquinasController