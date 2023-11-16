import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const dashboardController = express.Router()

dashboardController.get('/:id', async (req, res) => {
    const idMaquina = Number(req.params.id)
    try {
        const cpu = await prisma.maquina.findUnique({
            where: {
                id: idMaquina
            }
        })

        if(cpu){
            res.status(200).json(cpu)
        } else {
            res.status(200).json("Não existe cpu com esse id")
        }

    } catch (error) {
        res.status(400).json(error)
    }
})

dashboardController.get('/especificacoes/:id/:idComp/:idtipo', async (req, res) => {
    const idMaquina = Number(req.params.id)
    const idComp = Number(req.params.idComp)
    const tipoComp = Number(req.params.idtipo)
    try {
        const EspecificacaoCpu = await prisma.especificacoes.findMany({
            where: {
                fkMaquina: idMaquina,
                fkComponente: idComp,
                fkTipoComponente: tipoComp
            }
        })

        if (EspecificacaoCpu) {
            res.status(200).json(EspecificacaoCpu);
        } else {
            res.status(404).json("Não existe especificação de CPU com esse ID de máquina.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
})

export default dashboardController