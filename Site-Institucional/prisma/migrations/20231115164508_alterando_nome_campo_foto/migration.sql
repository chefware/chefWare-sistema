/*
  Warnings:

  - You are about to drop the column `profile_picture` on the `Funcionario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Funcionario` DROP COLUMN `profile_picture`,
    ADD COLUMN `foto` LONGBLOB NULL;
