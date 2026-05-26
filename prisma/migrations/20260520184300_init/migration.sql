-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "ciudad" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "aguaGrifo" TEXT NOT NULL,
    "aguaDucha" TEXT NOT NULL,
    "energiaLuces" TEXT NOT NULL,
    "energiaLeds" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);
