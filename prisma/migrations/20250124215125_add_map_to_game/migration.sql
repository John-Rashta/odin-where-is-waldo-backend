-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_mapid_fkey" FOREIGN KEY ("mapid") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
