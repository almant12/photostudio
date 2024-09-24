/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `postId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_postId_key` ON `Notification`(`postId`);

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
