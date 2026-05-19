module.exports = class CreateShopSystemTables1779209999999 {
  name = "CreateShopSystemTables1779209999999";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE products (

                id varchar(36) NOT NULL PRIMARY KEY,

                name varchar(100) NOT NULL,

                description text NULL,

                category enum(
                    'solo',
                    'package'
                ) NOT NULL,

                type enum(
                    'coins',
                    'lives'
                ) NOT NULL,

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

    await queryRunner.query(`
            CREATE TABLE purchases (

                id varchar(36) NOT NULL PRIMARY KEY,

                user_id int NOT NULL,

                product_id varchar(36) NOT NULL,

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

    await queryRunner.query(`
            CREATE TABLE payments (

                id varchar(36) NOT NULL PRIMARY KEY,

                user_id int NOT NULL,

                product_id varchar(36) NOT NULL,

                mp_preference_id varchar(255) NULL,

                mp_payment_id varchar(255) NULL UNIQUE,

                status enum(
                    'pending',
                    'approved',
                    'rejected',
                    'cancelled',
                    'refunded',
                    'in_process'
                ) NOT NULL DEFAULT 'pending',

                amount_brl decimal(10,2) NOT NULL,

                coins_credited int UNSIGNED NOT NULL DEFAULT 0,

                credited_at datetime NULL,

                mp_raw_response json NULL,

                created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

                updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

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
    await queryRunner.query(`DROP TABLE purchases`);
    await queryRunner.query(`DROP TABLE products`);
  }
};
