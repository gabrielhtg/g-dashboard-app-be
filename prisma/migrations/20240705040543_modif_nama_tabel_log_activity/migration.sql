/*
  Warnings:

  - You are about to drop the `logactivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `logactivity`;

-- CreateTable
CREATE TABLE `log_activity` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `log_data` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
