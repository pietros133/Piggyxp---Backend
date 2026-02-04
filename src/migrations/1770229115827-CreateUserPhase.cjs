/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

module.exports = class CreateUserPhase1770229115827 {
    name = 'CreateUserPhase1780229115827'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE \`user_phase\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`status\` int NOT NULL COMMENT '0 = pendente | 1 = em andamento | 2 = concluida' DEFAULT '0',
                \`created_at\` timestamp NULL,
                \`user_id\` int NOT NULL,
                \`phase_id\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        await queryRunner.query(`
            ALTER TABLE \`user_phase\`
            ADD CONSTRAINT \`FK_user_phase_user\`
            FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`)
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE \`user_phase\`
            ADD CONSTRAINT \`FK_user_phase_phase\`
            FOREIGN KEY (\`phase_id\`) REFERENCES \`phases\`(\`id\`)
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_phase\` DROP FOREIGN KEY \`FK_user_phase_phase\``);
        await queryRunner.query(`ALTER TABLE \`user_phase\` DROP FOREIGN KEY \`FK_user_phase_user\``);
        await queryRunner.query(`DROP TABLE \`user_phase\``);
    }
}
