/*
  Warnings:

  - Added the required column `language` to the `code-snippets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `code-snippets` ADD COLUMN `language` VARCHAR(100) NOT NULL;
