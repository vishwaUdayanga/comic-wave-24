/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Bought` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `Uploads` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Bought" DROP CONSTRAINT "Bought_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Issued" DROP CONSTRAINT "Issued_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Uploads" DROP CONSTRAINT "Uploads_studentId_fkey";

-- AlterTable
ALTER TABLE "Bought" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Issued" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Uploads" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Bought_studentId_key" ON "Bought"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Uploads_studentId_key" ON "Uploads"("studentId");

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bought" ADD CONSTRAINT "Bought_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issued" ADD CONSTRAINT "Issued_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
