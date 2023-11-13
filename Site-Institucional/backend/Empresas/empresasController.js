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
        const { nome, cnpj, telefone, endereco } = req.body;
        const empresaCriada = await prisma.empresa.create({
            data: {
                nome,
                cnpj,
                telefone
            }
        });

        let enderecoCriado = null;
        if (endereco) {
            enderecoCriado = await prisma.endereco.create({
                data: {
                    ...endereco,
                    fkEmpresa: empresaCriada.idEmpresa
                }
            });
        }
        res.status(201).json({ empresa: empresaCriada, endereco: enderecoCriado });
    } catch (e) {
        res.status(500).json(e);
    }
})

// Exemplo de requisição POST
// {
//     "nome": "Nova Empresa Ltda",
//     "cnpj": "12345678901234",
//     "telefone": "11987654321",
//     "endereco": {
//         "logradouro": "Rua Exemplo, 123",
//         "cep": "01234567",
//         "bairro": "Centro",
//         "numero": "123",
//         "estado": "SP"
//     }
// }

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

export default empresasController;
