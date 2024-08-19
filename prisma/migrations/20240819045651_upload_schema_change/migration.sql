/*
  Warnings:

  - Added the required column `imageData` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Uploads" ADD COLUMN     "imageData" BYTEA NOT NULL;
