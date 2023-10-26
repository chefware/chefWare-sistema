import app from "../../app";
const prisma = new PrismaClient();

app.get('/lista-funcionarios', async (req, res) => {
    const Funcionario = await prisma.Funcionario.findMany({})
    res.json(Funcionario)
})

app.post('/funcionarios', async (req, res) => {

    const {id, nome, email, senha, cpf, cargo, privilegio, fkEmpresa} = req.body
    const Funcionario = await prisma.Funcionario.create({
        data: {
            id,
            nome,
            cpf,
            email,
            senha,
            cargo,
            privilegio,
            fkEmpresa
        }
    })    
    res.json(createFunc)
})
