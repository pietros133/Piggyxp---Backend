/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UpdatePurchaseTable1780864508537 {
    name = 'UpdatePurchaseTable1780864508537'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`fk_user_missions_user\` ON \`user_missions\``);
        await queryRunner.query(`DROP INDEX \`fk_user_missions_mission\` ON \`user_missions\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_img\` \`user_img\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_login\` \`last_login\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`achievements\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`achievements\` char NOT NULL DEFAULT '0000000000'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`collectedAchievements\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`collectedAchievements\` char NOT NULL DEFAULT '0000000000'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recovery_code\` \`recovery_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recovery_code_expiration\` \`recovery_code_expiration\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_progress\` CHANGE \`reset_lives_at\` \`reset_lives_at\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user_progress\` ADD UNIQUE INDEX \`IDX_c41601eeb8415a9eb15c8a4e55\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`type\` \`type\` varchar(50) NOT NULL COMMENT 'complete_phases | correct_answers | streak | etc'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`target\` \`target\` int NOT NULL COMMENT 'quantidade necessária'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`condition\` \`condition\` varchar(50) NULL COMMENT 'ex: no_errors'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`frequency\` \`frequency\` varchar(20) NOT NULL COMMENT 'daily | weekly | monthly'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`xp\` \`xp\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`coins\` \`coins\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`progress\` \`progress\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`completed\` \`completed\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`selected\` \`selected\` tinyint NOT NULL COMMENT 'quais são as missões atuais do usuário' DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`reset_at\` \`reset_at\` timestamp NULL COMMENT 'quando a missão reseta'`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`mission_id\` \`mission_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`product_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`mp_preference_id\` \`mp_preference_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`mp_payment_id\` \`mp_payment_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`credited_at\` \`credited_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`mp_raw_response\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`mp_raw_response\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`purchases\` CHANGE \`id\` \`id\` varchar(36) NOT NULL DEFAULT UUID()`);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD \`product_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchases\` CHANGE \`coin_price_paid\` \`coin_price_paid\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP COLUMN \`payment_id\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD \`payment_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`coin_price\` \`coin_price\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`price_brl\` \`price_brl\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`icon_url\` \`icon_url\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c41601eeb8415a9eb15c8a4e55\` ON \`user_progress\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_progress\` ADD CONSTRAINT \`FK_c41601eeb8415a9eb15c8a4e557\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` ADD CONSTRAINT \`FK_28b09e17aac2884ad599d09053c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` ADD CONSTRAINT \`FK_49c3f14415ed531190d7266f860\` FOREIGN KEY (\`mission_id\`) REFERENCES \`missions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_427785468fb7d2733f59e7d7d39\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_ef30ea229dfffb9b2cda92155fe\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_024ddf7e04177a07fcb9806a90a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD CONSTRAINT \`FK_1ce91bd87ddfcecde930deeaab9\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_1ce91bd87ddfcecde930deeaab9\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP FOREIGN KEY \`FK_024ddf7e04177a07fcb9806a90a\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_ef30ea229dfffb9b2cda92155fe\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_427785468fb7d2733f59e7d7d39\``);
        await queryRunner.query(`ALTER TABLE \`user_missions\` DROP FOREIGN KEY \`FK_49c3f14415ed531190d7266f860\``);
        await queryRunner.query(`ALTER TABLE \`user_missions\` DROP FOREIGN KEY \`FK_28b09e17aac2884ad599d09053c\``);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``);
        await queryRunner.query(`ALTER TABLE \`user_progress\` DROP FOREIGN KEY \`FK_c41601eeb8415a9eb15c8a4e557\``);
        await queryRunner.query(`DROP INDEX \`REL_c41601eeb8415a9eb15c8a4e55\` ON \`user_progress\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`icon_url\` \`icon_url\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`price_brl\` \`price_brl\` decimal(10,2) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`coin_price\` \`coin_price\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP COLUMN \`payment_id\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD \`payment_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchases\` CHANGE \`coin_price_paid\` \`coin_price_paid\` int UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchases\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`purchases\` ADD \`product_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchases\` CHANGE \`id\` \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`mp_raw_response\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`mp_raw_response\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`credited_at\` \`credited_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`mp_payment_id\` \`mp_payment_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`mp_preference_id\` \`mp_preference_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`product_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`mission_id\` \`mission_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`reset_at\` \`reset_at\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`selected\` \`selected\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`completed\` \`completed\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_missions\` CHANGE \`progress\` \`progress\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`coins\` \`coins\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`xp\` \`xp\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`frequency\` \`frequency\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`condition\` \`condition\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`target\` \`target\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`missions\` CHANGE \`type\` \`type\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` CHANGE \`created_at\` \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_progress\` DROP INDEX \`IDX_c41601eeb8415a9eb15c8a4e55\``);
        await queryRunner.query(`ALTER TABLE \`user_progress\` CHANGE \`reset_lives_at\` \`reset_lives_at\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recovery_code_expiration\` \`recovery_code_expiration\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`recovery_code\` \`recovery_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`collectedAchievements\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`collectedAchievements\` char(10) NOT NULL DEFAULT ''0000000000''`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`achievements\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`achievements\` char(10) NOT NULL DEFAULT ''0000000000''`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_login\` \`last_login\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_img\` \`user_img\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE INDEX \`fk_user_missions_mission\` ON \`user_missions\` (\`mission_id\`)`);
        await queryRunner.query(`CREATE INDEX \`fk_user_missions_user\` ON \`user_missions\` (\`user_id\`)`);
    }
}
