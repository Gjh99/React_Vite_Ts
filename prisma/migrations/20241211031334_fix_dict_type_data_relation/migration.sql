/*
  Warnings:

  - You are about to drop the `dict_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dict_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `dict_data` DROP FOREIGN KEY `Dict_data_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `dict_data` DROP FOREIGN KEY `Dict_data_dict_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `dict_type` DROP FOREIGN KEY `Dict_type_createdById_fkey`;

-- DropTable
DROP TABLE `dict_data`;

-- DropTable
DROP TABLE `dict_type`;

-- CreateTable
CREATE TABLE `DictType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_name` VARCHAR(191) NOT NULL,
    `dict_type` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` INTEGER NULL,

    UNIQUE INDEX `DictType_dict_name_key`(`dict_name`),
    UNIQUE INDEX `DictType_dict_type_key`(`dict_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DictData` (
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
ALTER TABLE `DictType` ADD CONSTRAINT `DictType_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DictData` ADD CONSTRAINT `DictData_dict_type_id_fkey` FOREIGN KEY (`dict_type_id`) REFERENCES `DictType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DictData` ADD CONSTRAINT `DictData_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
