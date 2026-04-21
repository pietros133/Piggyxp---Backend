import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Mission } from "./missions.js";

export const UserMission = new EntitySchema({
  name: "UserMission",
  tableName: "user_missions",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    progress: {
      type: "int",
      default: 0,
    },

    completed: {
      type: "boolean",
      default: false,
    },

    selected: {
      type: "boolean",
      default: false,
      comment: "quais são as missões atuais do usuário"
    },

    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },

    reset_at: {
      type: "timestamp",
      nullable: true,
      comment: "quando a missão reseta",
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: User,
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
      },
      onDelete: "CASCADE",
    },

    mission: {
      type: "many-to-one",
      target: Mission,
      joinColumn: {
        name: "mission_id",
        referencedColumnName: "id",
      },
      onDelete: "CASCADE",
    },
  },
});