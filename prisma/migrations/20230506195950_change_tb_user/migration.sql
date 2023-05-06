/*
  Warnings:

  - The required column `sub` was added to the `tb_user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `tb_user` ADD COLUMN `sub` VARCHAR(191) NOT NULL;
