-- CreateTable
CREATE TABLE `Empresa` (
    `idEmpresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,

    PRIMARY KEY (`idEmpresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maquina` (
    `idMaquina` INTEGER NOT NULL AUTO_INCREMENT,
    `numSerie` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NULL,
    `hostName` VARCHAR(191) NULL,
    `modelo` VARCHAR(191) NULL,
    `local` VARCHAR(191) NULL,
    `descComponentes` VARCHAR(191) NULL,
    `fkEmpresa` INTEGER NOT NULL,
    `ativo` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`idMaquina`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionario` (
    `idFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NULL,
    `privilegio` VARCHAR(191) NULL,
    `foto` LONGBLOB NULL,
    `fkEmpresa` INTEGER NOT NULL,

    PRIMARY KEY (`idFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `idEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `fkEmpresa` INTEGER NOT NULL,

    PRIMARY KEY (`idEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Componente` (
    `idComponente` INTEGER NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(191) NULL,
    `compatibilidade` VARCHAR(191) NULL,
    `dataVencimento` VARCHAR(191) NULL,

    PRIMARY KEY (`idComponente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especificacoes` (
    `idEspecificacoes` INTEGER NOT NULL AUTO_INCREMENT,
    `fkMaquina` INTEGER NOT NULL,
    `fkComponente` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NULL,

    UNIQUE INDEX `Especificacoes_idEspecificacoes_key`(`idEspecificacoes`),
    INDEX `idx_tipo_maquina_componente`(`fkMaquina`, `fkComponente`),
    PRIMARY KEY (`idEspecificacoes`, `fkMaquina`, `fkComponente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dados` (
    `idDados` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NULL,
    `valor` VARCHAR(191) NULL,
    `unidadeMedida` VARCHAR(191) NULL,
    `fkEspecificacoes` INTEGER NOT NULL,
    `fkMaquina` INTEGER NOT NULL,
    `fkComponente` INTEGER NOT NULL,
    `dataHora` DATETIME(3) NULL,

    INDEX `idx_descricao_maquina_componente`(`fkEspecificacoes`, `fkMaquina`, `fkComponente`),
    PRIMARY KEY (`idDados`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historico` (
    `idHistorico` INTEGER NOT NULL AUTO_INCREMENT,
    `fkMaquina` INTEGER NOT NULL,
    `fkComponente` INTEGER NOT NULL,
    `fkEspecificacoes` INTEGER NOT NULL,
    `dataHora` DATETIME(3) NULL,
    `nome` VARCHAR(191) NULL,
    `leitura` VARCHAR(191) NULL,
    `unidadeMedida` VARCHAR(191) NULL,

    PRIMARY KEY (`idHistorico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maquina` ADD CONSTRAINT `Maquina_fkEmpresa_fkey` FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `Funcionario_fkEmpresa_fkey` FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_fkEmpresa_fkey` FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Especificacoes` ADD CONSTRAINT `Especificacoes_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Especificacoes` ADD CONSTRAINT `Especificacoes_fkComponente_fkey` FOREIGN KEY (`fkComponente`) REFERENCES `Componente`(`idComponente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dados` ADD CONSTRAINT `Dados_fkEspecificacoes_fkey` FOREIGN KEY (`fkEspecificacoes`) REFERENCES `Especificacoes`(`idEspecificacoes`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dados` ADD CONSTRAINT `Dados_fkComponente_fkey` FOREIGN KEY (`fkComponente`) REFERENCES `Componente`(`idComponente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dados` ADD CONSTRAINT `Dados_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkEspecificacoes_fkey` FOREIGN KEY (`fkEspecificacoes`) REFERENCES `Especificacoes`(`idEspecificacoes`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkComponente_fkey` FOREIGN KEY (`fkComponente`) REFERENCES `Componente`(`idComponente`) ON DELETE RESTRICT ON UPDATE CASCADE;
