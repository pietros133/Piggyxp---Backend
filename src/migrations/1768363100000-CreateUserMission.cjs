/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

module.exports = class CreateUserMissions1768363100000 {
  /**
   * @param {QueryRunner} queryRunner
   */
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE user_missions (
        id INT AUTO_INCREMENT PRIMARY KEY,    
        user_id INT NOT NULL,
        mission_id INT NOT NULL,
        progress INT DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        reset_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP,

        CONSTRAINT fk_user_missions_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_user_missions_mission
          FOREIGN KEY (mission_id)
          REFERENCES missions(id)
          ON DELETE CASCADE
      )
    `);
  }

  /**
   * @param {QueryRunner} queryRunner
   */
  async down(queryRunner) {
    await queryRunner.query(`
      DROP TABLE user_missions
    `);
  }
};