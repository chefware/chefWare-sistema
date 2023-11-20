import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const empresasController = express.Router();

empresasController.get('/page/:page', async (req, res) => {
    const take = 5;
    const page = Number(req.params.page) || 0;
    const skip = page * take;
    try {
        const [empresas, total] = await prisma.$transaction([
            prisma.empresa.findMany({
                take: take,
                skip: skip
            }),
            prisma.empresa.count()
        ]);

        const totalPaginas = Math.ceil(total / take);

        const empresasComEndereco = await Promise.all(empresas.map(async (empresa) => {
            const endereco = await prisma.endereco.findFirst({
                where: {
                    fkEmpresa: empresa.idEmpresa
                }
            });

            return {
                ...empresa,
                endereco,
                totalPaginas,
                paginaAtual: page,
                totalEmpresas: total
            };
        }));

        res.status(200).json({
            empresas: empresasComEndereco,
            totalPaginas,
            paginaAtual: page,
            totalEmpresas: total
        });

    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

empresasController.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const idEmpresa = Number(req.params.id);
    try {
        const empresa = await prisma.empresa.findUnique({
            where: {
                idEmpresa: idEmpresa
            },
            include: {
                enderecos: true
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

empresasController.get('/search/:termo', async (req, res) => {
    const termoPesquisa = req.params.termo.toLowerCase();

    try {
        const empresas = await prisma.empresa.findMany({
            where: {
                OR: [
                    { nome: { contains: termoPesquisa } },
                ]
            }
        });

        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json(error);
        console.error(error);
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
    try {
        const { nome, cnpj, telefone, endereco } = req.body;
        const empresaAtualizada = await prisma.empresa.update({
            where: {
                idEmpresa: idEmpresa
            },
            data: {
                nome,
                cnpj,
                telefone
            }
        });

        let enderecoAtualizado = null;

        if (endereco) {
            const enderecoExistente = await prisma.endereco.findFirst({
                where: {
                    fkEmpresa: idEmpresa
                }
            });

            if (enderecoExistente) {
                enderecoAtualizado = await prisma.endereco.update({
                    where: {
                        idEndereco: enderecoExistente.idEndereco
                    },
                    data: {
                        ...endereco
                    }
                });
            } else {
            }
        }

        res.status(200).json({ empresa: empresaAtualizada, endereco: enderecoAtualizado });
    } catch (error) {
        console.error("Erro ao atualizar empresa:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ error: "Erro de validação do Prisma" });
        } else {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
});

empresasController.delete('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);
    try {
        const empresaDeletada = await prisma.empresa.delete({
            where: {
                idEmpresa: idEmpresa
            }
        });
        res.status(200).json(empresaDeletada);
    } catch (e) {
        res.status(500).json(e);
        console.log(e);
    }
});

export default empresasController;
