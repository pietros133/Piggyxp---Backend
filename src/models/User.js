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

    user_img: {
      type: "varchar",
      length: 255,
      nullable: true,
    },

    nivel: {
      type: "int",
      default: 0,
    },

    xp: {
      type: "int",
      default: 0,
    },

    coins: {
      type: "int",
      default: 0,
    },

    last_login: {
      type: "timestamp",
      nullable: true,
    },

    offensive_days: {
      type: "int",
      default: 0,
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
