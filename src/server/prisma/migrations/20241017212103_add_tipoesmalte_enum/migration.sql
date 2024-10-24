-- CreateEnum
CREATE TYPE "TipoEsmalte" AS ENUM ('Cremoso', 'Cintilante', 'Metalico', 'Fosco', 'Glitter', 'Holografico', 'Perolado', 'Gel');

-- CreateTable
CREATE TABLE "esmaltacao" (
    "id" SERIAL NOT NULL,
    "foto" VARCHAR(255) NOT NULL,
    "esmalte_id" INTEGER,
    "nome" VARCHAR(255),
    "notas" TEXT,

    CONSTRAINT "esmaltacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esmalte" (
    "id" SERIAL NOT NULL,
    "nomeesmalte" VARCHAR(255) NOT NULL,
    "marca" VARCHAR(255) NOT NULL,
    "cor" VARCHAR(50) NOT NULL,
    "tipoesmalte" "TipoEsmalte",
    "fotos" VARCHAR(255) NOT NULL,
    "notas" TEXT,

    CONSTRAINT "esmalte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nomeusuario" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "esmaltacao" ADD CONSTRAINT "esmaltacao_esmalte_id_fkey" FOREIGN KEY ("esmalte_id") REFERENCES "esmalte"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
