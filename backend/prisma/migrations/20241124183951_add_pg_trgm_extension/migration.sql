-- CreateTable
CREATE TABLE "Events" (
    "event_id" SERIAL NOT NULL,
    "event_name" VARCHAR NOT NULL,
    "odds" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE INDEX "Events_deletedAt_idx" ON "Events"("deletedAt");
