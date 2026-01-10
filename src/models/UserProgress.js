import { EntitySchema } from "typeorm";
import { User } from "./User.js";

export const UserProgress = new EntitySchema({
  name: "UserProgress",
  tableName: "user_progress",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
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

    offensive_days: {
      type: "int",
      default: 0,
    },

    lives: {
      type: "int",
      default: 5,
    },

    reset_lives_at: {
      type: "timestamp",
      nullable: true,
    },
  },

  relations: {
    user: {
      type: "one-to-one",
      target: User,
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },
    //Favor não mexer - ainda em desenvolvimento
    /*current_unit: {
      type: "many-to-one",
      target: "Unit",
      joinColumn: {
        name: "current_unit_id",
        referencedColumnName: "id",
      },
      nullable: true,
      onDelete: "SET NULL",
    },*/
  },
});
