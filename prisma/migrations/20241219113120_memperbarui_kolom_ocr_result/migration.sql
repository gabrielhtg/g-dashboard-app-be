-- AlterTable
ALTER TABLE `ocr_result` ADD COLUMN `status` VARCHAR(191) NULL,
    MODIFY `result` LONGTEXT NULL,
    MODIFY `link` VARCHAR(255) NULL,
    MODIFY `total_page` INTEGER NULL;
