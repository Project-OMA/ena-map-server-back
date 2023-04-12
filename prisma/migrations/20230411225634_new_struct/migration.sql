/*
  Warnings:

  - The primary key for the `rel_owner_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_usuario` on the `rel_owner_group` table. All the data in the column will be lost.
  - The primary key for the `rel_owner_map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_usuario` on the `rel_owner_map` table. All the data in the column will be lost.
  - The primary key for the `tb_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_group` on the `tb_group` table. All the data in the column will be lost.
  - You are about to drop the column `no_grupo` on the `tb_group` table. All the data in the column will be lost.
  - The primary key for the `tb_map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_map` on the `tb_map` table. All the data in the column will be lost.
  - You are about to drop the column `map_url` on the `tb_map` table. All the data in the column will be lost.
  - You are about to drop the column `no_map` on the `tb_map` table. All the data in the column will be lost.
  - You are about to drop the `rel_owner_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rel_usuario_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rel_usuario_map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_user` to the `rel_owner_group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `rel_owner_map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `tb_group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tb_group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `tb_map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tb_map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `tb_map` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rel_owner_group` DROP FOREIGN KEY `rel_owner_group_id_group_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_group` DROP FOREIGN KEY `rel_owner_group_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_map` DROP FOREIGN KEY `rel_owner_map_id_map_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_map` DROP FOREIGN KEY `rel_owner_map_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `rel_owner_usuario` DROP FOREIGN KEY `rel_owner_usuario_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `rel_usuario_group` DROP FOREIGN KEY `rel_usuario_group_id_group_fkey`;

-- DropForeignKey
ALTER TABLE `rel_usuario_group` DROP FOREIGN KEY `rel_usuario_group_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `rel_usuario_map` DROP FOREIGN KEY `rel_usuario_map_id_map_fkey`;

-- DropForeignKey
ALTER TABLE `rel_usuario_map` DROP FOREIGN KEY `rel_usuario_map_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tb_group` DROP FOREIGN KEY `tb_group_id_owner_fkey`;

-- AlterTable
ALTER TABLE `rel_owner_group` DROP PRIMARY KEY,
    DROP COLUMN `id_usuario`,
    ADD COLUMN `id_user` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_group`);

-- AlterTable
ALTER TABLE `rel_owner_map` DROP PRIMARY KEY,
    DROP COLUMN `id_usuario`,
    ADD COLUMN `id_user` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id_user`, `id_map`);

-- AlterTable
ALTER TABLE `tb_group` DROP PRIMARY KEY,
    DROP COLUMN `id_group`,
    DROP COLUMN `no_grupo`,
    ADD COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_map` DROP PRIMARY KEY,
    DROP COLUMN `id_map`,
    DROP COLUMN `map_url`,
    DROP COLUMN `no_map`,
    ADD COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `url` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `rel_owner_usuario`;

-- DropTable
DROP TABLE `rel_usuario_group`;

-- DropTable
DROP TABLE `rel_usuario_map`;

-- DropTable
DROP TABLE `tb_usuario`;

-- CreateTable
CREATE TABLE `tb_user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `type` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_owner_user` (
    `id` BIGINT NOT NULL,
    `tag` JSON NOT NULL,

    INDEX `rel_owner_user_id_user_fkey`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_user_group` (
    `id_user` BIGINT NOT NULL,
    `id_group` BIGINT NOT NULL,
    `tag` JSON NOT NULL,

    INDEX `rel_user_group_id_user_fkey`(`id_user`),
    INDEX `rel_user_group_id_group_fkey`(`id_group`),
    PRIMARY KEY (`id_user`, `id_group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_user_map` (
    `id_user` BIGINT NOT NULL,
    `id_map` BIGINT NOT NULL,
    `order` JSON NOT NULL,

    INDEX `rel_user_map_id_user_fkey`(`id_user`),
    INDEX `rel_user_map_id_map_fkey`(`id_map`),
    PRIMARY KEY (`id_user`, `id_map`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `rel_owner_group_id_user_fkey` ON `rel_owner_group`(`id_user`);

-- CreateIndex
CREATE INDEX `rel_owner_map_id_user_fkey` ON `rel_owner_map`(`id_user`);

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

-- RenameIndex
ALTER TABLE `rel_owner_map` RENAME INDEX `rel_owner_mapa_id_map_fkey` TO `rel_owner_map_id_map_fkey`;
