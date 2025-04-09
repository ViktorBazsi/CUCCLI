-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_userId_fkey";

-- AlterTable
ALTER TABLE "Performance" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
