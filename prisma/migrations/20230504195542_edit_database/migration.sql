/*
  Warnings:

  - You are about to drop the `rel_owner_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rel_owner_map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rel_user_map` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_owner` to the `tb_map` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rel_owner_group` DROP FOREIGN KEY `rel_owner_group_id_group_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_group` DROP FOREIGN KEY `rel_owner_group_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_map` DROP FOREIGN KEY `rel_owner_map_id_map_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_map` DROP FOREIGN KEY `rel_owner_map_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `rel_user_map` DROP FOREIGN KEY `rel_user_map_id_map_fkey`;

-- DropForeignKey
ALTER TABLE `rel_user_map` DROP FOREIGN KEY `rel_user_map_id_user_fkey`;

-- AlterTable
ALTER TABLE `tb_map` ADD COLUMN `id_owner` INTEGER NOT NULL;

-- DropTable
DROP TABLE `rel_owner_group`;

-- DropTable
DROP TABLE `rel_owner_map`;

-- DropTable
DROP TABLE `rel_user_map`;

-- CreateTable
CREATE TABLE `rel_group_map` (
    `id_group` INTEGER NOT NULL,
    `id_map` INTEGER NOT NULL,
    `order` JSON NOT NULL,

    INDEX `rel_user_map_id_group_fkey`(`id_group`),
    INDEX `rel_user_map_id_map_fkey`(`id_map`),
    PRIMARY KEY (`id_group`, `id_map`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `tb_group_id_owner_fkey` ON `tb_group`(`id_owner`);

-- CreateIndex
CREATE INDEX `tb_map_id_owner_fkey` ON `tb_map`(`id_owner`);

-- AddForeignKey
ALTER TABLE `rel_group_map` ADD CONSTRAINT `rel_group_map_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `tb_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_group_map` ADD CONSTRAINT `rel_group_map_id_map_fkey` FOREIGN KEY (`id_map`) REFERENCES `tb_map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_map` ADD CONSTRAINT `tb_map_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
