import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const historicoController = express.Router()

historicoController.get('/:idMaquina/:idComp', async (req, res) => {
    const idMaquina = Number(req.params.idMaquina)
    const idComp = Number(req.params.idComp)
    try {
        const historico = await prisma.historico.findMany({
            where: {
                fkMaquina: idMaquina,
                fkComponente: idComp
            }
        })

        if(historico){
            res.status(200).json(historico)
        } else {
            res.status(200).json("Não existe tipo historico com esse id")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

export default historicoController