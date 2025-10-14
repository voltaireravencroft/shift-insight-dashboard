-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_shiftId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "shiftId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
