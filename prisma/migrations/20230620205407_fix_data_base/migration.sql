/*
  Warnings:

  - You are about to drop the column `id_owner` on the `tb_group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_group` DROP FOREIGN KEY `tb_group_id_owner_fkey`;

-- AlterTable
ALTER TABLE `tb_group` DROP COLUMN `id_owner`;
