/*
  Warnings:

  - You are about to drop the `code-snippets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `code-snippets`;

-- CreateTable
CREATE TABLE `code_snippets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `description` TEXT NOT NULL,
    `code_snippet` TEXT NOT NULL,
    `language` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
