/*
  Warnings:

  - You are about to drop the `unidadeMedida` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Dados` DROP FOREIGN KEY `Dados_unidadeMedida_fkey`;

-- DropForeignKey
ALTER TABLE `Historico` DROP FOREIGN KEY `Historico_unidadeMedida_fkey`;

-- AlterTable
ALTER TABLE `Dados` MODIFY `unidadeMedida` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Historico` MODIFY `unidadeMedida` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `unidadeMedida`;
