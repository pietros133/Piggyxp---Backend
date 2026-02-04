import { EntitySchema } from "typeorm";

export const Unit = new EntitySchema({
  name: "Unit",
  tableName: "unit",

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

    dificulty: {
      type: "int",
      comment: "0 = easy | 1 = normal | 2 = hard"
    },

    ordem: {
      type: "int",
      default: 1
    },

    created_at: {
        type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },

  },
});
