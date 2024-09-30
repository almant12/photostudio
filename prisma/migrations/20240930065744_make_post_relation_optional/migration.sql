-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_postId_fkey`;

-- AlterTable
ALTER TABLE `notification` MODIFY `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
