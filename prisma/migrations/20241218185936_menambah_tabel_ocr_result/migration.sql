-- CreateTable
CREATE TABLE `ocr_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `result` LONGTEXT NOT NULL,
    `upload_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uploaded_by` VARCHAR(191) NOT NULL,
    `total_file` INTEGER NOT NULL,
    `bank_type` VARCHAR(191) NOT NULL,
    `error_message` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
