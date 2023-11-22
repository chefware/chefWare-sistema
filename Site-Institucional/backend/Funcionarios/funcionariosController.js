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

funcionariosController.get('/', async (req, res) => {
    try {
        const funcionarios = await prisma.funcionario.findMany();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.json({ error: error.message });
    }
});

funcionariosController.get('/:id', async (req, res) => {
    try {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                id: Number(req.params.id),
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
        }

        let updateData = {
            nome,
            email,
            senha,
            cpf,
            cargo,
            privilegio,
        };

        if (fotoPerfil) {
            fotoPerfilBuffer = fotoPerfil.buffer;
            updateData.foto = fotoPerfilBuffer;
        }

        const funcionarioAtualizado = await prisma.Funcionario.update({
            where: {
                id: Number(id),
            },
            data: {
                nome,
                email,
                senha,
                cpf,
                cargo,
                privilegio,
                foto: fotoPerfilBuffer,
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
                id: Number(id),
            },
        });

        res.status(200).json(funcionarioDeletado);
    } catch (error) {
        res.json({ error: error.message });
    }
});


export default funcionariosController;
