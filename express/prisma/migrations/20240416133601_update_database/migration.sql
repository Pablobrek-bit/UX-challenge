/*
  Warnings:

  - You are about to drop the column `userId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_userId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_roomsToUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_roomsToUsers_AB_unique" ON "_roomsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_roomsToUsers_B_index" ON "_roomsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_roomsToUsers" ADD CONSTRAINT "_roomsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roomsToUsers" ADD CONSTRAINT "_roomsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
