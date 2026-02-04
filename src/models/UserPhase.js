import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Phases } from "./Phases.js";

export const UserPhase = new EntitySchema({
  name: "UserPhase",
  tableName: "user_phase",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    status: {
      type: "int",
      default: 0,
      comment: "0 = pendente | 1 = em andamento | 2 = concluida"
    },

    created_at: {
      type: "timestamp",
      nullable: true
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
      nullable: false,
      onDelete: "CASCADE",
    },

    phase: {
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
