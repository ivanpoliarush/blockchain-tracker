/*
  Warnings:

  - Added the required column `hash` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "hash" TEXT NOT NULL,
ALTER COLUMN "value" SET DATA TYPE TEXT;
