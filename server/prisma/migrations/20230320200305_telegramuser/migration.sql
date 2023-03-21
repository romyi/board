-- CreateTable
CREATE TABLE `TelegramUser` (
    `id` INTEGER NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `internal_id` INTEGER NOT NULL,

    UNIQUE INDEX `TelegramUser_id_key`(`id`),
    UNIQUE INDEX `TelegramUser_internal_id_key`(`internal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TelegramUser` ADD CONSTRAINT `TelegramUser_internal_id_fkey` FOREIGN KEY (`internal_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
