-- CreateTable
CREATE TABLE "Events" (
    "event_id" SERIAL NOT NULL,
    "event_name" VARCHAR NOT NULL,
    "odds" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id")
);
