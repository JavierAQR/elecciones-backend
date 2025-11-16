-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ELECTION', 'TRAINING', 'DEADLINE', 'OTHER');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ALL', 'ELECTOR', 'MESA');

-- CreateEnum
CREATE TYPE "CandidateRole" AS ENUM ('PRESIDENT', 'VICE_PRESIDENT', 'CONGRESS', 'SENATOR', 'PARLAMENTO_ANDINO');

-- CreateEnum
CREATE TYPE "RegionLevel" AS ENUM ('NATIONAL', 'REGIONAL');

-- CreateEnum
CREATE TYPE "GuideRole" AS ENUM ('INFO', 'ELECTOR', 'MESA');

-- CreateEnum
CREATE TYPE "GuideSection" AS ENUM ('OVERVIEW', 'BEFORE', 'DURING', 'AFTER', 'INSTALLATION', 'SUFRAGIO', 'CLOSING');

-- CreateEnum
CREATE TYPE "ProposalTopic" AS ENUM ('ECONOMY', 'EDUCATION', 'HEALTH', 'SECURITY', 'OTHER');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "targetRole" "RoleType" NOT NULL DEFAULT 'ALL',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoUrl" TEXT,
    "website" TEXT,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "CandidateRole" NOT NULL,
    "regionLevel" "RegionLevel" NOT NULL,
    "bio" TEXT NOT NULL,
    "cvUrl" TEXT,
    "partyId" INTEGER NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" "ProposalTopic" NOT NULL,
    "partyId" INTEGER NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleGuide" (
    "id" SERIAL NOT NULL,
    "role" "GuideRole" NOT NULL,
    "section" "GuideSection" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "RoleGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VotingLocation" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "placeName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VotingLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoterAssignment" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "fullName" TEXT,
    "isMesaMember" BOOLEAN NOT NULL DEFAULT false,
    "tableNumber" TEXT NOT NULL,
    "votingLocationId" INTEGER NOT NULL,

    CONSTRAINT "VoterAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoterAssignment_dni_key" ON "VoterAssignment"("dni");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoterAssignment" ADD CONSTRAINT "VoterAssignment_votingLocationId_fkey" FOREIGN KEY ("votingLocationId") REFERENCES "VotingLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
