/*
  Warnings:

  - You are about to drop the column `senn` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification` DROP COLUMN `senn`,
    ADD COLUMN `seen` BOOLEAN NOT NULL DEFAULT false;
