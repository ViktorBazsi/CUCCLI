/*
  Warnings:

  - You are about to drop the column `topic` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `title` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "topic",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "quote" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
