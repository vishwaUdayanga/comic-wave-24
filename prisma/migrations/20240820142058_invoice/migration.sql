/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Issued` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticketId]` on the table `Issued` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "invoice_number" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_studentId_key" ON "Invoice"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoice_number_key" ON "Invoice"("invoice_number");

-- CreateIndex
CREATE UNIQUE INDEX "Issued_studentId_key" ON "Issued"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Issued_ticketId_key" ON "Issued"("ticketId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registrationNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
