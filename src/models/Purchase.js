import { EntitySchema } from "typeorm";

export const Purchase = new EntitySchema({
  name: "Purchase",
  tableName: "purchases",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
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
