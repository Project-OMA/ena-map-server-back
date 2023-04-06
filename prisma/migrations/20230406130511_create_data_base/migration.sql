-- CreateTable
CREATE TABLE `tb_usuario` (
    `id_usuario` BIGINT NOT NULL AUTO_INCREMENT,
    `no_usuario` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `type` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_owner_usuario` (
    `id_usuario` BIGINT NOT NULL,
    `tag` JSON NOT NULL,

    INDEX `rel_owner_usuario_id_usuario_fkey`(`id_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_owner_group` (
    `id_usuario` BIGINT NOT NULL,
    `id_group` BIGINT NOT NULL,
    `tag` JSON NOT NULL,

    INDEX `rel_owner_group_id_usuario_fkey`(`id_usuario`),
    INDEX `rel_owner_group_id_group_fkey`(`id_group`),
    PRIMARY KEY (`id_usuario`, `id_group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_usuario_group` (
    `id_usuario` BIGINT NOT NULL,
    `id_group` BIGINT NOT NULL,
    `tag` JSON NOT NULL,

    INDEX `rel_usuario_group_id_usuario_fkey`(`id_usuario`),
    INDEX `rel_usuario_group_id_group_fkey`(`id_group`),
    PRIMARY KEY (`id_usuario`, `id_group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_group` (
    `id_group` BIGINT NOT NULL AUTO_INCREMENT,
    `no_grupo` VARCHAR(255) NOT NULL,
    `id_owner` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_group_id_owner_key`(`id_owner`),
    PRIMARY KEY (`id_group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_usuario_map` (
    `id_usuario` BIGINT NOT NULL,
    `id_map` BIGINT NOT NULL,
    `order` JSON NOT NULL,

    INDEX `rel_usuario_mapa_id_usuario_fkey`(`id_usuario`),
    INDEX `rel_usuario_mapa_id_map_fkey`(`id_map`),
    PRIMARY KEY (`id_usuario`, `id_map`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rel_owner_map` (
    `id_usuario` BIGINT NOT NULL,
    `id_map` BIGINT NOT NULL,
    `tag` JSON NOT NULL,

    INDEX `rel_owner_mapa_id_usuario_fkey`(`id_usuario`),
    INDEX `rel_owner_mapa_id_map_fkey`(`id_map`),
    PRIMARY KEY (`id_usuario`, `id_map`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_map` (
    `id_map` BIGINT NOT NULL AUTO_INCREMENT,
    `no_map` VARCHAR(255) NOT NULL,
    `thumb_url` VARCHAR(255) NOT NULL,
    `map_url` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_map`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rel_owner_usuario` ADD CONSTRAINT `rel_owner_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_group` ADD CONSTRAINT `rel_owner_group_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_group` ADD CONSTRAINT `rel_owner_group_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `tb_group`(`id_group`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_usuario_group` ADD CONSTRAINT `rel_usuario_group_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_usuario_group` ADD CONSTRAINT `rel_usuario_group_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `tb_group`(`id_group`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_group` ADD CONSTRAINT `tb_group_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `tb_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_usuario_map` ADD CONSTRAINT `rel_usuario_map_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_usuario_map` ADD CONSTRAINT `rel_usuario_map_id_map_fkey` FOREIGN KEY (`id_map`) REFERENCES `tb_map`(`id_map`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_map` ADD CONSTRAINT `rel_owner_map_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rel_owner_map` ADD CONSTRAINT `rel_owner_map_id_map_fkey` FOREIGN KEY (`id_map`) REFERENCES `tb_map`(`id_map`) ON DELETE RESTRICT ON UPDATE CASCADE;
