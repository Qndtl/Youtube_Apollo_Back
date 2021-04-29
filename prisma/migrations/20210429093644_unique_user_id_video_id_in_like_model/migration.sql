/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_videoId_unique" ON "Like"("userId", "videoId");
