/*
  Warnings:

  - You are about to drop the column `total_file` on the `ocr_result` table. All the data in the column will be lost.
  - Added the required column `total_page` to the `ocr_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ocr_result` DROP COLUMN `total_file`,
    ADD COLUMN `total_page` INTEGER NOT NULL;
