/*
  Warnings:

  - You are about to drop the column `tag` on the `rel_user_group` table. All the data in the column will be lost.
  - Added the required column `tag` to the `tb_map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rel_user_group` DROP COLUMN `tag`;

-- AlterTable
ALTER TABLE `tb_map` ADD COLUMN `tag` JSON NOT NULL;
