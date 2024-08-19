/*
  Warnings:

  - You are about to drop the column `imageData` on the `Uploads` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Uploads" DROP COLUMN "imageData",
ADD COLUMN     "fileUrl" TEXT NOT NULL;
