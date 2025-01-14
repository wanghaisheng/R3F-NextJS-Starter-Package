-- CreateTable
CREATE TABLE "skills" (
    "skill_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "skill" VARCHAR(100),
    "percentage" INTEGER,
    "experience_id" UUID,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "users" (
    "gg_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "email" VARCHAR(100),
    "password" VARCHAR(255),
    "phone_number" VARCHAR(15),
    "oauth_provider" VARCHAR(50),
    "oauth_token" VARCHAR(255),
    "otp" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "image_url" VARCHAR(255),
    "description" TEXT,
    "address" VARCHAR(200),
    "dob" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("gg_id")
);

-- CreateTable
CREATE TABLE "admin" (
    "admin_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "admin_username" VARCHAR(100),
    "admin_email" VARCHAR(100),
    "admin_password" VARCHAR(100),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "avatar_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "gg_id" UUID,
    "avatar_url" VARCHAR(255),

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("avatar_id")
);

-- CreateTable
CREATE TABLE "experience" (
    "experience_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "gg_id" UUID,
    "type" VARCHAR(50),
    "name" VARCHAR(50),
    "description" TEXT,
    "tools" TEXT[],

    CONSTRAINT "experience_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "cards" (
    "card_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "gg_id" UUID,
    "type" VARCHAR(50),
    "name" VARCHAR(50),
    "description" TEXT,
    "date_in" VARCHAR,
    "date_out" VARCHAR,

    CONSTRAINT "card_pkey" PRIMARY KEY ("card_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "admin_admin_username_key" ON "admin"("admin_username");

-- CreateIndex
CREATE UNIQUE INDEX "admin_admin_email_key" ON "admin"("admin_email");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("experience_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "users"("gg_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "users"("gg_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "card_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "users"("gg_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
