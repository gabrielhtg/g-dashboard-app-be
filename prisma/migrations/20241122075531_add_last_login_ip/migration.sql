-- CreateTable
CREATE TABLE `log_activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `log_data` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `profile_picture` VARCHAR(250) NOT NULL DEFAULT '',
    `password` VARCHAR(250) NOT NULL,
    `last_ip` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `code_snippets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `description` TEXT NOT NULL,
    `code_snippet` TEXT NOT NULL,
    `language` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usefull_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,
    `description` TEXT NOT NULL,
    `link` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
