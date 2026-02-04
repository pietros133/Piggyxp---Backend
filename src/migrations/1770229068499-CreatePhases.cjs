/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreatePhases1675620000000 {
    name = 'CreatePhases1775620000000'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        // Primeiro criamos a tabela
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`phases\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`tittle\` varchar(255) NOT NULL,
                \`order\` int NOT NULL DEFAULT '1',
                \`unit_id\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // Depois adicionamos a FK
        await queryRunner.query(`
            ALTER TABLE \`phases\` 
            ADD CONSTRAINT \`FK_phases_unit\` 
            FOREIGN KEY (\`unit_id\`) REFERENCES \`unit\`(\`id\`) 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`phases\` DROP FOREIGN KEY \`FK_phases_unit\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`phases\``);
    }
}
