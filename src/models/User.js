import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    name: {
      type: "varchar",
      length: 255,
    },

    email: {
      type: "varchar",
      length: 255,
      unique: true,
    },

    password: {
      type: "varchar",
      length: 255,
    },

    difficulty: {
      type: "int",
      default: 1,
      comment: "0 = easy | 1 = normal | 2 = hard",
    },

    user_img: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    last_login: {
      type: "timestamp",
      nullable: true,
    },

    recovery_code: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    recovery_code_expiration: {
      type: "timestamp",
      nullable: true,
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },

    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
});
