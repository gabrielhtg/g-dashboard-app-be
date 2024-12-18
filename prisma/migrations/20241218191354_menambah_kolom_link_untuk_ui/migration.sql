/*
  Warnings:

  - Added the required column `link` to the `ocr_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ocr_result` ADD COLUMN `link` VARCHAR(255) NOT NULL;
