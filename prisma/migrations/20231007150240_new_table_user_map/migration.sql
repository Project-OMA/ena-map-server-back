-- CreateTable
CREATE TABLE `rel_map_user` (
    `id_user` INTEGER NOT NULL,
    `id_map` INTEGER NOT NULL,
    `in_completed` BOOLEAN NOT NULL,

    INDEX `rel_user_map_id_user_fkey`(`id_user`),
    INDEX `rel_user_map_id_map_fkey`(`id_map`),
    PRIMARY KEY (`id_user`, `id_map`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rel_map_user` ADD CONSTRAINT `rel_map_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_map_user` ADD CONSTRAINT `rel_map_user_id_map_fkey` FOREIGN KEY (`id_map`) REFERENCES `tb_map`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
