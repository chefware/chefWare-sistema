/*
  Warnings:

  - You are about to drop the column `descComponentes` on the `Maquina` table. All the data in the column will be lost.
  - You are about to drop the `SistemaOperacional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ComponenteToSistemaOperacional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ComponenteToSistemaOperacional` DROP FOREIGN KEY `_ComponenteToSistemaOperacional_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ComponenteToSistemaOperacional` DROP FOREIGN KEY `_ComponenteToSistemaOperacional_B_fkey`;

-- DropIndex
DROP INDEX `Historico_unidadeMedida_fkey` ON `Historico`;

-- AlterTable
ALTER TABLE `Maquina` DROP COLUMN `descComponentes`;

-- DropTable
DROP TABLE `SistemaOperacional`;

-- DropTable
DROP TABLE `_ComponenteToSistemaOperacional`;
