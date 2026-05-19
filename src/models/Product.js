// src/models/Product.js

import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Product",

  tableName: "products",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    name: {
      type: "varchar",
      length: 100,
    },

    description: {
      type: "text",
      nullable: true,
    },

    category: {
      type: "enum",
      enum: ["solo", "package"],
    },

    type: {
      type: "enum",
      enum: ["coins", "lives"],
    },

    coinPrice: {
      name: "coin_price",
      type: "int",
      unsigned: true,
      nullable: true,
    },

    priceBrl: {
      name: "price_brl",
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },

    rewardAmount: {
      name: "reward_amount",
      type: "int",
      unsigned: true,
    },

    bonusAmount: {
      name: "bonus_amount",
      type: "int",
      unsigned: true,
      default: 0,
    },

    isFeatured: {
      name: "is_featured",
      type: "boolean",
      default: false,
    },

    isActive: {
      name: "is_active",
      type: "boolean",
      default: true,
    },

    iconUrl: {
      name: "icon_url",
      type: "varchar",
      length: 255,
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
    purchases: {
      type: "one-to-many",
      target: "Purchase",
      inverseSide: "product",
    },

    payments: {
      type: "one-to-many",
      target: "Payment",
      inverseSide: "product",
    },
  },
});
