import { EntitySchema } from "typeorm";

export const RefreshToken = new EntitySchema({
  name: "RefreshToken",
  tableName: "refresh_tokens",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    token_hash: {
      type: "varchar",
      length: 255,
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
});
