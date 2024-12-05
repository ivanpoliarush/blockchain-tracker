/*
  Warnings:

  - You are about to alter the column `blockNumber` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "blockNumber" SET DATA TYPE INTEGER;
