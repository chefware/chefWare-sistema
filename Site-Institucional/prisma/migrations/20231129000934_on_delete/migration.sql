/*
  Warnings:

  - You are about to drop the column `ativo` on the `Maquina` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Componente` DROP FOREIGN KEY `Componente_fkMaquina_fkey`;

-- DropForeignKey
ALTER TABLE `Dados` DROP FOREIGN KEY `Dados_fkMaquina_fkey`;

-- DropForeignKey
ALTER TABLE `Historico` DROP FOREIGN KEY `Historico_fkMaquina_fkey`;

-- DropForeignKey
ALTER TABLE `Maquina` DROP FOREIGN KEY `Maquina_fkEmpresa_fkey`;

-- AlterTable
ALTER TABLE `Maquina` DROP COLUMN `ativo`;

-- AddForeignKey
ALTER TABLE `Maquina` ADD CONSTRAINT `Maquina_fkEmpresa_fkey` FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Componente` ADD CONSTRAINT `Componente_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dados` ADD CONSTRAINT `Dados_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_fkMaquina_fkey` FOREIGN KEY (`fkMaquina`) REFERENCES `Maquina`(`idMaquina`) ON DELETE CASCADE ON UPDATE CASCADE;
