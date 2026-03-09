/*
  Warnings:

  - The `prepTime` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "prepTime",
ADD COLUMN     "prepTime" INTEGER NOT NULL DEFAULT 30;
