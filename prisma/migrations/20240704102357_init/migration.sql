-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `profile_picture` VARCHAR(250) NOT NULL,
    `password` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
