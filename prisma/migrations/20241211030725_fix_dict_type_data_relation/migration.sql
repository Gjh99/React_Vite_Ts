-- AlterTable
ALTER TABLE `role` ADD COLUMN `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Dict_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_name` VARCHAR(191) NOT NULL,
    `dict_type` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,

    UNIQUE INDEX `Dict_type_dict_name_key`(`dict_name`),
    UNIQUE INDEX `Dict_type_dict_type_key`(`dict_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dict_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_type_id` INTEGER NOT NULL,
    `data_label` VARCHAR(191) NOT NULL,
    `data_value` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dict_type` ADD CONSTRAINT `Dict_type_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dict_data` ADD CONSTRAINT `Dict_data_dict_type_id_fkey` FOREIGN KEY (`dict_type_id`) REFERENCES `Dict_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dict_data` ADD CONSTRAINT `Dict_data_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
