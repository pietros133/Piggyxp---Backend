import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Phases } from "./Phases.js"

export const User_Phase = new EntitySchema({
  name: "User_Phases",
  tableName: "user_phases",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    completed_at: {
        type: "timestamp",
        nullable: true,
    },
  },

  relations: {
    User: {
      type: "many-to-one",
      target: User,
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },

    Phase: {
      type: "many-to-one",
      target: Phases,
      joinColumn: {
        name: "phase_id",
        referencedColumnName: "id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});