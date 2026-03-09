-- AlterTable
ALTER TABLE "public"."Recipe" ADD COLUMN     "prepTime" TEXT NOT NULL DEFAULT '30 min',
ADD COLUMN     "servings" INTEGER NOT NULL DEFAULT 1;
