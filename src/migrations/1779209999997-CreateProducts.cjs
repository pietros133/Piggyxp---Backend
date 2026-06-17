module.exports = class CreateProducts1779209999997 {
  name = "CreateProducts1779209999997";

  async up(queryRunner) {
    await queryRunner.query(`
        CREATE TABLE products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name varchar(100) NOT NULL,
            description text NULL,
            category enum('solo', 'package') NOT NULL,
            type enum('coins', 'lives') NOT NULL,
            coin_price int UNSIGNED NULL,
            price_brl decimal(10,2) NULL,
            reward_amount int UNSIGNED NOT NULL,
            bonus_amount int UNSIGNED NOT NULL DEFAULT 0,
            is_featured tinyint NOT NULL DEFAULT 0,
            is_active tinyint NOT NULL DEFAULT 1,
            icon_url varchar(255) NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP
        )
    `);
    
  }    

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE products`);
  }
};
