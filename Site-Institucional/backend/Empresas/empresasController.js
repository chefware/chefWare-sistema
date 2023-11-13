import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const empresasController = express.Router();

empresasController.get('/', async (req, res) => {
    try {
        const empresas = await prisma.empresa.findMany();
        const empresasComEndereco = await Promise.all(empresas.map(async (empresa) => {
            const endereco = await prisma.endereco.findFirst({
                where: {
                    fkEmpresa: empresa.idEmpresa
                }
            });
            return {
                ...empresa,
                endereco
            }
        }));
        res.status(200).json(empresasComEndereco);
    } catch (error) {
        res.status(400).json(e);
    }
});

empresasController.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const idEmpresa = Number(req.params.id);
    try {
        const empresa = await prisma.empresa.findUnique({
            where: {
                idEmpresa: idEmpresa
            }
        });

        if(empresa){
            res.status(200).json(empresa);
        } else {
            res.status(404).json("Não existe empresa com esse id");
        }

    } catch (error) {
        res.status(400).json(error);
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

empresasController.patch('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);
    const { nome, cnpj, telefone, endereco } = req.body;

    try {
        const empresaAtualizada = await prisma.empresa.update({
            where: {
                idEmpresa: idEmpresa,
            },
            data: {
                nome,
                cnpj,
                telefone,
                enderecos: {
                    upsert: {
                        create: {
                            logradouro: endereco.logradouro,
                            cep: endereco.cep,
                            bairro: endereco.bairro,
                            numero: endereco.numero,
                            estado: endereco.estado,
                            empresa: {
                                connect: { idEmpresa: idEmpresa },
                            },
                        },
                        update: {
                            logradouro: endereco.logradouro,
                            cep: endereco.cep,
                            bairro: endereco.bairro,
                            numero: endereco.numero,
                            estado: endereco.estado,
                        },
                    },
                },
            },
        });

        res.status(200).json(empresaAtualizada);
    } catch (e) {
        res.status(409).json(e);
    }
})

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
