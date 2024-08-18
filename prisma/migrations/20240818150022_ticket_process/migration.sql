-- CreateTable
CREATE TABLE "Uploads" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bought" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issued" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issued" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "Issued_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bought" ADD CONSTRAINT "Bought_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issued" ADD CONSTRAINT "Issued_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issued" ADD CONSTRAINT "Issued_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Bought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
