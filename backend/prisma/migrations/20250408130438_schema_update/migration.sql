-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_availableDateId_fkey";

-- AlterTable
ALTER TABLE "Performance" ALTER COLUMN "availableDateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_availableDateId_fkey" FOREIGN KEY ("availableDateId") REFERENCES "AvailableDate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
