// src/models/Payment.js

import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Payment",

  tableName: "payments",

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

    mpPreferenceId: {
      name: "mp_preference_id",
      type: "varchar",
      length: 255,
      nullable: true,
    },

    mpPaymentId: {
      name: "mp_payment_id",
      type: "varchar",
      length: 255,
      nullable: true,
      unique: true,
    },

    status: {
      type: "enum",
      enum: [
        "pending",
        "approved",
        "rejected",
        "cancelled",
        "refunded",
        "in_process",
      ],
      default: "pending",
    },

    amountBrl: {
      name: "amount_brl",
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    coinsCredited: {
      name: "coins_credited",
      type: "int",
      unsigned: true,
      default: 0,
    },

    creditedAt: {
      name: "credited_at",
      type: "datetime",
      nullable: true,
    },

    mpRawResponse: {
      name: "mp_raw_response",
      type: "json",
      nullable: true,
    },

    createdAt: {
      name: "created_at",
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      name: "updated_at",
      type: "timestamp",
      updateDate: true,
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
