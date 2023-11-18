import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const componentesController = express.Router()

componentesController.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const componente = await prisma.componente.findMany({
            where: {
                idComponente: id
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