import express from 'express'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'

const prisma = new PrismaClient()
const upload = multer({ storage: multer.memoryStorage() })
const funcionariosController = express.Router()

funcionariosController.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body
        const funcionario = await prisma.Funcionario.findFirst({
            where: {
                email: email,
                senha: senha,
            },
        })
        if (funcionario) {
            res.status(200).json(funcionario)
        } else {
            res.status(404).json({ message: "Funcionario não encontrado" })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

funcionariosController.get('/page/:page', async (req, res) => {
    const take = 5
    const page = Number(req.params.page) || 0
    const skip = page * take
    var fkEmpresa = Number(req.query.fkEmpresa)

    if (fkEmpresa === 1) { // se for chefware, mostre todos os funcionários de todas as empresas
        fkEmpresa = null
    }

    try {
        const [funcionarios, total] = await prisma.$transaction([
            prisma.funcionario.findMany({
                take: take,
                skip: skip,
                where: {
                    fkEmpresa: fkEmpresa || undefined
                },
                select: {
                    idFuncionario: true,
                    nome: true,
                    email: true,
                    cpf: true,
                    cargo: true,
                    privilegio: true,
                    fkEmpresa: true,
                    foto: false
                }
            }),
            prisma.funcionario.count()
        ])

        const totalPaginas = Math.ceil(total / take)

        const resposta = {
            funcionarios,
            totalPaginas,
            paginaAtual: page,
            totalFuncionarios: total
        }

        res.status(200).json(resposta)

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

funcionariosController.get('/:id', async (req, res) => {
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                idFuncionario: Number(req.params.id),
            },
        })
        res.status(200).json(funcionario)
    } catch (error) {
        res.json({ error: error.message })
    }
})

funcionariosController.get('/search/:termo', async (req, res) => {
    const termoPesquisa = req.params.termo.toLowerCase()

    try {
        const funcionario = await prisma.funcionario.findMany({
            where: {
                OR: [
                    { nome: { contains: termoPesquisa } },
                ]
            }
        })

        res.status(200).json(funcionario)
    } catch (error) {
        res.status(500).json(error)
        console.error(error)
    }
})

funcionariosController.post('/', upload.single('foto'), async (req, res) => {
    try {
        const { nome, email, senha, cpf, cargo, privilegio, fkEmpresa } = req.body
        const fotoPerfil = req.file
        const fkEmpresaInt = Number(fkEmpresa)
        let fotoPerfilBuffer = null

        if (fotoPerfil) {
            fotoPerfilBuffer = fotoPerfil.buffer
        }

        const funcionarioCriado = await prisma.Funcionario.create({
            data: {
                nome,
                email,
                senha,
                cpf,
                cargo,
                privilegio,
                fkEmpresa: fkEmpresaInt,
                foto: fotoPerfilBuffer,
            },
        })

        res.status(201).json(funcionarioCriado)
    } catch (error) {
        res.json({ error: error.message })

    }
})

funcionariosController.patch('/:id', upload.single('foto'), async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email, senha, cpf, cargo, privilegio } = req.body
        const fotoPerfil = req.file  // Nova foto, se fornecida

        // Obtenha os dados do funcionário existente
        const funcionarioExistente = await prisma.Funcionario.findUnique({
            where: {
                idFuncionario: Number(id),
            },
        })

        // Se uma nova foto foi fornecida, atualize-a; caso contrário, mantenha a foto existente
        const fotoPerfilBuffer = fotoPerfil ? fotoPerfil.buffer : funcionarioExistente.foto

        const updateData = {
            nome,
            email,
            senha,
            cpf,
            cargo,
            privilegio,
            foto: fotoPerfilBuffer,
        }

        const funcionarioAtualizado = await prisma.Funcionario.update({
            where: {
                idFuncionario: Number(id),
            },
            data: updateData,
        })

        res.status(200).json(funcionarioAtualizado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

funcionariosController.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const funcionarioDeletado = await prisma.Funcionario.delete({
            where: {
                idFuncionario: Number(id),
            },
        })

        res.status(200).json(funcionarioDeletado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

funcionariosController.get('/foto/:id', async (req, res) => {
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                idFuncionario: Number(req.params.id),
            },
            select: {
                foto: true,
            }
        })

        if (!funcionario || !funcionario.foto) {
            // Se não houver funcionário ou foto, retorne um erro ou status 404, conforme apropriado
            res.status(404).send('Funcionário não encontrado ou sem foto.')
            return
        }

        // Defina o cabeçalho Content-Type para imagem/png ou o tipo MIME apropriado
        res.setHeader('Content-Type', 'image/png')

        // Envie os dados da imagem como resposta
        res.status(200).send(funcionario.foto)
    } catch (error) {
        console.log(error)
        res.status(500).send('Erro ao buscar a foto do funcionário.')
    }
})


export default funcionariosController
