module.exports = class CreatePayments1779209999999 {
  name = "CreatePayments1779209999999";

  async up(queryRunner) {
    await queryRunner.query(`
        CREATE TABLE payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id int NOT NULL,
            product_id int NOT NULL,
            mp_preference_id varchar(255) NOT NULL,
            mp_payment_id varchar(255) NULL UNIQUE,
            status enum('pending', 'approved', 'rejected', 'cancelled', 'refunded', 'in_progress') NOT NULL DEFAULT 'pending',
            amount_brl decimal(10,2) NOT NULL,
            coins_credited int UNSIGNED NOT NULL DEFAULT 0,
            credited_at datetime NULL,
            mp_raw_response json NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
            CONSTRAINT fk_payment_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE RESTRICT,

            CONSTRAINT fk_payment_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE RESTRICT
        )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE payments`);
  }
}