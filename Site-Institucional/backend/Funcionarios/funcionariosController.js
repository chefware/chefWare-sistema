import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });
const funcionariosController = express.Router();

funcionariosController.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const funcionario = await prisma.Funcionario.findFirst({
            where: {
                email: email,
                senha: senha,
            },
        });
        if (funcionario) {
            res.status(200).json(funcionario);
        } else {
            res.status(404).json({ message: "Funcionario não encontrado" });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

funcionariosController.get('/page/:page', async (req, res) => {
    const take = 5;
    const page = Number(req.params.page) || 0;
    const skip = page * take;
    try {
        const [funcionarios, total] = await prisma.$transaction([
            prisma.funcionario.findMany({
                take: take,
                skip: skip,
                // select: {
                //     id: true,
                //     nome: true,
                //     email: true,
                //     cpf: true,
                //     cargo: true,
                //     privilegio: true,
                //     fkEmpresa: true,
                //     foto: false
                // }
            }),
            prisma.funcionario.count()
        ]);

        const totalPaginas = Math.ceil(total / take);

        const resposta = {
            funcionarios,
            totalPaginas,
            paginaAtual: page,
            totalFuncionarios: total
        };

        res.status(200).json(resposta);

    } catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});

funcionariosController.get('/:id', async (req, res) => {
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                idFuncionario: Number(req.params.id),
            },
        });
        res.status(200).json(funcionario);
    } catch (error) {
        res.json({ error: error.message });
    }
});

funcionariosController.post('/', upload.single('foto'), async (req, res) => {
    try {
        const { nome, email, senha, cpf, cargo, privilegio, fkEmpresa } = req.body;
        const fotoPerfil = req.file;
        const fkEmpresaInt = Number(fkEmpresa);
        let fotoPerfilBuffer = null;

        if (fotoPerfil) {
            fotoPerfilBuffer = fotoPerfil.buffer;
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
        });

        res.status(201).json(funcionarioCriado);
    } catch (error) {
        res.json({ error: error.message });

    }
});

funcionariosController.patch('/:id', upload.single('foto'), async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, cpf, cargo, privilegio } = req.body;
        const fotoPerfil = req.file;
        let fotoPerfilBuffer = null;

        if (fotoPerfil) {
            fotoPerfilBuffer = fotoPerfil.buffer;
            updateData.foto = fotoPerfilBuffer;
        }

        let updateData = {
            nome,
            email,
            senha,
            cpf,
            cargo,
            privilegio,
            foto: fotoPerfilBuffer,
        };

        const funcionarioAtualizado = await prisma.Funcionario.update({
            where: {
                idFuncionario: Number(id),
            },
            data: updateData,
        });

        res.status(200).json(funcionarioAtualizado);
    } catch (error) {
        res.json({ error: error.message });
    }
});

funcionariosController.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const funcionarioDeletado = await prisma.Funcionario.delete({
            where: {
                idFuncionario: Number(id),
            },
        });

        res.status(200).json(funcionarioDeletado);
    } catch (error) {
        res.json({ error: error.message });
    }
});


export default funcionariosController;
