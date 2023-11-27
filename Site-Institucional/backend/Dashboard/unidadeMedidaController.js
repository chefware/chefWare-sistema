import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const unidadeMedidaController = express.Router()

unidadeMedidaController.get('/:id', async (req, res) => {
    const idUnidade = Number(req.params.id)
    try {
        const dados = await prisma.unidadeMedida.findMany({
            where: {
                idUnidadeMedida: idUnidade
            }
        })

        if(dados){
            res.status(200).json(dados)
        } else {
            res.status(200).json("Não existe unidades com esses ids")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

export default unidadeMedidaController