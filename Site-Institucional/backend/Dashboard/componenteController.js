import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const componentesController = express.Router()

componentesController.get('/tipoComponente/:nome', async (req, res) => {
    const nomeComponente = req.params.nome
    try {
        const tipoComponente = await prisma.tipoComponente.findMany({
            where: {
                nome: nomeComponente.toUpperCase()
            }
        })

        if(tipoComponente){
            res.status(200).json(tipoComponente)
        } else {
            res.status(200).json("Não existe tipo componente com esse id")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

componentesController.get('/:idTipoComponente', async (req, res) => {
    const idTipoComponente = Number(req.params.idTipoComponente)
    try {
        const componente = await prisma.componente.findMany({
            where: {
                fkTipoComponente: idTipoComponente
            }
        })

        if(componente){
            res.status(200).json(componente)
        } else {
            res.status(200).json("Não existe componente com esse id")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

export default componentesController