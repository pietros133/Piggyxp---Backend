module.exports = class CreatePurchases1779209999998 {
  name = "CreatePurchases1779209999998";

  async up(queryRunner) {
    await queryRunner.query(`
        CREATE TABLE purchases (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id int NOT NULL,
            product_id int NOT NULL,
            coin_price_paid int UNSIGNED NULL,
            reward_amount int UNSIGNED NOT NULL,
            payment_id varchar(36) NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                
            CONSTRAINT fk_purchase_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE RESTRICT,

            CONSTRAINT fk_purchase_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE RESTRICT
        )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE purchases`);
  }

}