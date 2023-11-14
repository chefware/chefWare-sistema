-- DropForeignKey
ALTER TABLE `Endereco` DROP FOREIGN KEY `Endereco_fkEmpresa_fkey`;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_fkEmpresa_fkey` FOREIGN KEY (`fkEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE;
