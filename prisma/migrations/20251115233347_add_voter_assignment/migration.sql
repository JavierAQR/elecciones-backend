/*
  Warnings:

  - You are about to drop the column `tableNumber` on the `VotingLocation` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "VoterAssignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT NOT NULL,
    "fullName" TEXT,
    "isMesaMember" BOOLEAN NOT NULL DEFAULT false,
    "tableNumber" TEXT NOT NULL,
    "votingLocationId" INTEGER NOT NULL,
    CONSTRAINT "VoterAssignment_votingLocationId_fkey" FOREIGN KEY ("votingLocationId") REFERENCES "VotingLocation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VotingLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "department" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL
);
INSERT INTO "new_VotingLocation" ("address", "department", "district", "id", "lat", "lng", "placeName", "province") SELECT "address", "department", "district", "id", "lat", "lng", "placeName", "province" FROM "VotingLocation";
DROP TABLE "VotingLocation";
ALTER TABLE "new_VotingLocation" RENAME TO "VotingLocation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "VoterAssignment_dni_key" ON "VoterAssignment"("dni");
