/*
  Warnings:

  - You are about to drop the column `details` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `log` table. All the data in the column will be lost.
  - Added the required column `endpoint` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log` DROP COLUMN `details`,
    DROP COLUMN `level`,
    DROP COLUMN `message`,
    ADD COLUMN `endpoint` VARCHAR(191) NOT NULL,
    ADD COLUMN `method` VARCHAR(191) NOT NULL,
    ADD COLUMN `requestBody` VARCHAR(191) NULL,
    ADD COLUMN `response` VARCHAR(191) NULL;
