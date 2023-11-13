/*
  Warnings:

  - The primary key for the `Especificacoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tipo` on the `Especificacoes` table. All the data in the column will be lost.
  - You are about to drop the column `fkEspecificacoes` on the `Historico` table. All the data in the column will be lost.
  - You are about to drop the `Dados` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fkTipoComponente` to the `Componente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkTipoComponente` to the `Especificacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fkTipoComponente` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Dados` DROP FOREIGN KEY `Dados_fkComponente_fkey`;

-- DropForeignKey
ALTER TABLE `Dados` DROP FOREIGN KEY `Dados_fkEspecificacoes_fkey`;

-- DropForeignKey
ALTER TABLE `Dados` DROP FOREIGN KEY `Dados_fkMaquina_fkey`;

-- DropForeignKey
ALTER TABLE `Historico` DROP FOREIGN KEY `Historico_fkEspecificacoes_fkey`;

-- AlterTable
ALTER TABLE `Componente` ADD COLUMN `fkTipoComponente` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Especificacoes` DROP PRIMARY KEY,
    DROP COLUMN `tipo`,
    ADD COLUMN `dadosEstaticos` VARCHAR(191) NULL,
    ADD COLUMN `descricao` VARCHAR(191) NULL,
    ADD COLUMN `fkTipoComponente` INTEGER NOT NULL,
    ADD COLUMN `unidadeMedida` VARCHAR(191) NULL,
    MODIFY `idEspecificacoes` INTEGER NOT NULL,
    ADD PRIMARY KEY (`idEspecificacoes`, `fkTipoComponente`, `fkMaquina`, `fkComponente`);

-- AlterTable
ALTER TABLE `Historico` DROP COLUMN `fkEspecificacoes`,
    ADD COLUMN `fkTipoComponente` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Dados`;

-- CreateTable
CREATE TABLE `TipoComponente` (
    `idtipoComponente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,

    PRIMARY KEY (`idtipoComponente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_tipo_maquina_componente` ON `Especificacoes`(`fkTipoComponente`, `fkMaquina`, `fkComponente`);

-- AddForeignKey
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_fkTipoComponente_fkey` FOREIGN KEY (`fkTipoComponente`) REFERENCES `TipoComponente`(`idtipoComponente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Especificacoes` ADD CONSTRAINT `Especificacoes_fkTipoComponente_fkey` FOREIGN KEY (`fkTipoComponente`) REFERENCES `TipoComponente`(`idtipoComponente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkTipoComponente_fkey` FOREIGN KEY (`fkTipoComponente`) REFERENCES `TipoComponente`(`idtipoComponente`) ON DELETE RESTRICT ON UPDATE CASCADE;
