/*
  Warnings:

  - The primary key for the `rel_owner_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_group` on the `rel_owner_group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_user` on the `rel_owner_group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rel_owner_map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_map` on the `rel_owner_map` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_user` on the `rel_owner_map` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rel_owner_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `rel_owner_user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rel_user_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_user` on the `rel_user_group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_group` on the `rel_user_group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rel_user_map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_user` on the `rel_user_map` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id_map` on the `rel_user_map` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `tb_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_owner` on the `tb_group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `tb_group` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `tb_map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tb_map` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `tb_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tb_user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `type` on the `tb_user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

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
ALTER TABLE `rel_owner_user` DROP FOREIGN KEY `rel_owner_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `rel_user_group` DROP FOREIGN KEY `rel_user_group_id_group_fkey`;

-- DropForeignKey
ALTER TABLE `rel_user_group` DROP FOREIGN KEY `rel_user_group_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `rel_user_map` DROP FOREIGN KEY `rel_user_map_id_map_fkey`;

-- DropForeignKey
ALTER TABLE `rel_user_map` DROP FOREIGN KEY `rel_user_map_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `tb_group` DROP FOREIGN KEY `tb_group_id_owner_fkey`;

-- AlterTable
ALTER TABLE `rel_owner_group` DROP PRIMARY KEY,
    MODIFY `id_group` INTEGER NOT NULL,
    MODIFY `id_user` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_group`);

-- AlterTable
ALTER TABLE `rel_owner_map` DROP PRIMARY KEY,
    MODIFY `id_map` INTEGER NOT NULL,
    MODIFY `id_user` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_map`);

-- AlterTable
ALTER TABLE `rel_owner_user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rel_user_group` DROP PRIMARY KEY,
    MODIFY `id_user` INTEGER NOT NULL,
    MODIFY `id_group` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_group`);

-- AlterTable
ALTER TABLE `rel_user_map` DROP PRIMARY KEY,
    MODIFY `id_user` INTEGER NOT NULL,
    MODIFY `id_map` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_map`);

-- AlterTable
ALTER TABLE `tb_group` DROP PRIMARY KEY,
    MODIFY `id_owner` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_map` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `type` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `rel_owner_user` ADD CONSTRAINT `rel_owner_user_id_fkey` FOREIGN KEY (`id`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_group` ADD CONSTRAINT `rel_owner_group_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_group` ADD CONSTRAINT `rel_owner_group_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `tb_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_user_group` ADD CONSTRAINT `rel_user_group_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_user_group` ADD CONSTRAINT `rel_user_group_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `tb_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_group` ADD CONSTRAINT `tb_group_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_user_map` ADD CONSTRAINT `rel_user_map_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_user_map` ADD CONSTRAINT `rel_user_map_id_map_fkey` FOREIGN KEY (`id_map`) REFERENCES `tb_map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_map` ADD CONSTRAINT `rel_owner_map_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_map` ADD CONSTRAINT `rel_owner_map_id_map_fkey` FOREIGN KEY (`id_map`) REFERENCES `tb_map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
