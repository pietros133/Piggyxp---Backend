// src/models/Purchase.js

import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Purchase",

  tableName: "purchases",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    userId: {
      name: "user_id",
      type: "int",
    },

    productId: {
      name: "product_id",
      type: "uuid",
    },

    coinPricePaid: {
      name: "coin_price_paid",
      type: "int",
      unsigned: true,
      nullable: true,
    },

    rewardAmount: {
      name: "reward_amount",
      type: "int",
      unsigned: true,
    },

    paymentId: {
      name: "payment_id",
      type: "uuid",
      nullable: true,
    },

    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "RESTRICT",
    },

    product: {
      type: "many-to-one",
      target: "Product",
      joinColumn: {
        name: "product_id",
      },
      onDelete: "RESTRICT",
    },
  },
});
