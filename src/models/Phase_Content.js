import { EntitySchema } from "typeorm";
import { Phases } from "./Phases.js";

export const Phase_Content = new EntitySchema({
  name: "Phase_Content",
  tableName: "phase_content",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    ContentKey: {
        type: "int",
        default: 1
    },
  },

  relations: {
    phases: {
      type: "one-to-one",
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