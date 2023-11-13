/*
  Warnings:

  - You are about to drop the `Telefone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Telefone` DROP FOREIGN KEY `Telefone_Empresa_idEmpresa_fkey`;

-- DropTable
DROP TABLE `Telefone`;
