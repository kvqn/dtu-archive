-- DropForeignKey
ALTER TABLE `FileHearts` DROP FOREIGN KEY `user_hearts_ibfk_1`;

-- DropForeignKey
ALTER TABLE `FileHearts` DROP FOREIGN KEY `user_hearts_ibfk_2`;

-- DropForeignKey
ALTER TABLE `FileTags` DROP FOREIGN KEY `file_tags_ibfk_1`;

-- DropForeignKey
ALTER TABLE `FileTags` DROP FOREIGN KEY `file_tags_ibfk_2`;

-- DropForeignKey
ALTER TABLE `FileViews` DROP FOREIGN KEY `file_views_ibfk_1`;

-- DropForeignKey
ALTER TABLE `FileViews` DROP FOREIGN KEY `file_views_ibfk_2`;

-- AddForeignKey
ALTER TABLE `FileHearts` ADD CONSTRAINT `user_hearts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FileHearts` ADD CONSTRAINT `user_hearts_ibfk_2` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FileViews` ADD CONSTRAINT `file_views_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FileViews` ADD CONSTRAINT `file_views_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FileTags` ADD CONSTRAINT `file_tags_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `FileTags` ADD CONSTRAINT `file_tags_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
