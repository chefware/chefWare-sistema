/*
  Warnings:

  - You are about to drop the column `fkEspecificacoes` on the `Dados` table. All the data in the column will be lost.
  - You are about to drop the column `fkEspecificacoes` on the `Historico` table. All the data in the column will be lost.
  - You are about to drop the `Especificacoes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fkMaquina` to the `Componente` table without a default value. This is not possible if the table is not empty.
  - Made the column `unidadeMedida` on table `Dados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unidadeMedida` on table `Historico` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Dados` DROP FOREIGN KEY `Dados_fkEspecificacoes_fkey`;

-- DropForeignKey
ALTER TABLE `Especificacoes` DROP FOREIGN KEY `Especificacoes_fkComponente_fkey`;

-- DropForeignKey
ALTER TABLE `Especificacoes` DROP FOREIGN KEY `Especificacoes_fkMaquina_fkey`;

-- DropForeignKey
ALTER TABLE `Historico` DROP FOREIGN KEY `Historico_fkEspecificacoes_fkey`;

-- DropIndex
DROP INDEX `idx_descricao_maquina_componente` ON `Dados`;

-- AlterTable
ALTER TABLE `Componente` ADD COLUMN `fkMaquina` INTEGER NOT NULL,
    ADD COLUMN `tipo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Dados` DROP COLUMN `fkEspecificacoes`,
    MODIFY `unidadeMedida` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Historico` DROP COLUMN `fkEspecificacoes`,
    MODIFY `unidadeMedida` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Especificacoes`;

-- CreateTable
CREATE TABLE `SistemaOperacional` (
    `idSistemaOperacional` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NULL,

    PRIMARY KEY (`idSistemaOperacional`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidadeMedida` (
    `idUnidadeMedida` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NULL,

    PRIMARY KEY (`idUnidadeMedida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ComponenteToSistemaOperacional` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ComponenteToSistemaOperacional_AB_unique`(`A`, `B`),
    INDEX `_ComponenteToSistemaOperacional_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_descricao_maquina_componente` ON `Dados`(`unidadeMedida`, `fkMaquina`, `fkComponente`);

-- AddForeignKey
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dados` ADD CONSTRAINT `Dados_unidadeMedida_fkey` FOREIGN KEY (`unidadeMedida`) REFERENCES `unidadeMedida`(`idUnidadeMedida`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_unidadeMedida_fkey` FOREIGN KEY (`unidadeMedida`) REFERENCES `unidadeMedida`(`idUnidadeMedida`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComponenteToSistemaOperacional` ADD CONSTRAINT `_ComponenteToSistemaOperacional_A_fkey` FOREIGN KEY (`A`) REFERENCES `Componente`(`idComponente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ComponenteToSistemaOperacional` ADD CONSTRAINT `_ComponenteToSistemaOperacional_B_fkey` FOREIGN KEY (`B`) REFERENCES `SistemaOperacional`(`idSistemaOperacional`) ON DELETE CASCADE ON UPDATE CASCADE;
