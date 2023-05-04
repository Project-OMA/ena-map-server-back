/*
  Warnings:

  - You are about to drop the `rel_owner_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rel_owner_user` DROP FOREIGN KEY `rel_owner_user_id_fkey`;

-- DropTable
DROP TABLE `rel_owner_user`;
