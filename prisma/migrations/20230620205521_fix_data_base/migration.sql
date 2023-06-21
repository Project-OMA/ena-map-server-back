/*
  Warnings:

  - Added the required column `id_owner` to the `tb_group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_group` ADD COLUMN `id_owner` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `tb_group_id_owner_fkey` ON `tb_group`(`id_owner`);

-- AddForeignKey
ALTER TABLE `tb_group` ADD CONSTRAINT `tb_group_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
