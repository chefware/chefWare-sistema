import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const dadosController = express.Router()

dadosController.get('/:idMaquina/:idComp', async (req, res) => {
    const idMaquina = Number(req.params.idMaquina)
    const idComp = Number(req.params.idComp)
    try {
        const dados = await prisma.dados.findMany({
            where: {
                fkMaquina: idMaquina,
                fkComponente: idComp  
            }
        })

        if(dados){
            res.status(200).json(dados)
        } else {
            res.status(200).json("Não existe dados com esses ids")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

export default dadosController