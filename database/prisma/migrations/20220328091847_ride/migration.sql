-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "pickup" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);
