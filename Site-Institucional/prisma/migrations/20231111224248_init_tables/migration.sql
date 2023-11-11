/*
  Warnings:

  - You are about to drop the column `Empresa_idEmpresa` on the `Maquina` table. All the data in the column will be lost.
  - Added the required column `fkEmpresa` to the `Maquina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Maquina` DROP FOREIGN KEY `Maquina_Empresa_idEmpresa_fkey`;

-- AlterTable
ALTER TABLE `Maquina` DROP COLUMN `Empresa_idEmpresa`,
    ADD COLUMN `fkEmpresa` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Maquina` ADD CONSTRAINT `Maquina_fkEmpresa_fkey` FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE RESTRICT ON UPDATE CASCADE;
