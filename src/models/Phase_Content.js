import { EntitySchema } from "typeorm";
import { Phases } from "./Phases.js";

export const Phase_Content = new EntitySchema({
  name: "PhaseContent",
  tableName: "phase_content",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },

    contentKey: {

    },
  },

  relations: {
    phase: {
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
