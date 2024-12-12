/*
  Warnings:

  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `nick_name` VARCHAR(191) NULL,
    ADD COLUMN `user_age` INTEGER NULL,
    ADD COLUMN `user_sex` INTEGER NULL,
    MODIFY `user_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_user_name_key` ON `User`(`user_name`);
