/*
  Warnings:

  - The values [PAID_PARTIAL,PAID_FULL] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentSatus" AS ENUM ('NOT_PAID', 'PAID_PARTIAL', 'PAID_FULL');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('CREATED', 'IN_PREPARATION', 'WRITING', 'REHEARSAL', 'PREMIERE', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Performance" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Performance" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Performance" ALTER COLUMN "status" SET DEFAULT 'CREATED';
COMMIT;

-- AlterTable
ALTER TABLE "Performance" ADD COLUMN     "payment" "PaymentSatus" NOT NULL DEFAULT 'NOT_PAID';
