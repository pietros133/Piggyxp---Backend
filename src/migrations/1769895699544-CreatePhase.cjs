/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreatePhase1769895699544 {
    name = 'CreatePhase1769895699544'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_c41601eeb8415a9eb15c8a4e55\` ON \`user_progress\``);
        await queryRunner.query(`CREATE TABLE \`unit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`difficulty\` tinyint NOT NULL COMMENT '0=easy, 1=medium, 2=hard' DEFAULT '0', \`order\` int NOT NULL DEFAULT '1', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`phases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tittle\` varchar(255) NOT NULL, \`order\` int NOT NULL DEFAULT '1', \`unit_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_phases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`completed_at\` timestamp NULL, \`user_id\` int NOT NULL, \`phase_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`phases\` ADD CONSTRAINT \`FK_dfd490589dcf9ca5a3b05c52f65\` FOREIGN KEY (\`unit_id\`) REFERENCES \`unit\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_phases\` ADD CONSTRAINT \`FK_7225d43edf0d939ad5fd6956429\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_phases\` ADD CONSTRAINT \`FK_4b64295334958873492e8533592\` FOREIGN KEY (\`phase_id\`) REFERENCES \`phases\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_phases\` DROP FOREIGN KEY \`FK_4b64295334958873492e8533592\``);
        await queryRunner.query(`ALTER TABLE \`user_phases\` DROP FOREIGN KEY \`FK_7225d43edf0d939ad5fd6956429\``);
        await queryRunner.query(`ALTER TABLE \`phases\` DROP FOREIGN KEY \`FK_dfd490589dcf9ca5a3b05c52f65\``);
        await queryRunner.query(`DROP TABLE \`user_phases\``);
        await queryRunner.query(`DROP TABLE \`phases\``);
        await queryRunner.query(`DROP TABLE \`unit\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c41601eeb8415a9eb15c8a4e55\` ON \`user_progress\` (\`user_id\`)`);
    }
}
