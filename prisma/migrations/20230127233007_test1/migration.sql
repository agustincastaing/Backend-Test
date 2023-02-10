/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('CLIENT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Insurable` (
    `id` VARCHAR(191) NOT NULL,
    `Section` ENUM('MOTORBIKE', 'CLASSIC_CAR') NOT NULL,
    `Insured_amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Policy` (
    `id` VARCHAR(191) NOT NULL,
    `policyNumber` INTEGER NOT NULL,
    `insurableId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Policy_insurableId_key`(`insurableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Policy` ADD CONSTRAINT `Policy_insurableId_fkey` FOREIGN KEY (`insurableId`) REFERENCES `Insurable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
