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

    difficulty: {
      type: "tinyint",
      default: 0,
      comment: "0=easy, 1=medium, 2=hard",
    },

    order: {
        type: "int",
        default: 1
    },

    created_at: {
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }
},
});
