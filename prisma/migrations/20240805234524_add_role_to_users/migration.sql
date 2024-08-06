-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBERS');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBERS';
