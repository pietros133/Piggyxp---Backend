/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateUser1768004738396 {
  name = "CreateUser1768004738396";

  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`difficulty\` int NOT NULL COMMENT '0 = easy | 1 = normal | 2 = hard' DEFAULT '1', \`user_img\` varchar(255) NULL, \`last_login\` timestamp NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_progress\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nivel\` int NOT NULL DEFAULT '0', \`xp\` int NOT NULL DEFAULT '0', \`coins\` int NOT NULL DEFAULT '0', \`offensive_days\` int NOT NULL DEFAULT '0', \`lives\` int NOT NULL DEFAULT '5', \`reset_lives_at\` timestamp NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`REL_c41601eeb8415a9eb15c8a4e55\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_progress\` ADD CONSTRAINT \`FK_c41601eeb8415a9eb15c8a4e557\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`user_progress\` DROP FOREIGN KEY \`FK_c41601eeb8415a9eb15c8a4e557\``
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c41601eeb8415a9eb15c8a4e55\` ON \`user_progress\``
    );
    await queryRunner.query(`DROP TABLE \`user_progress\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
};
