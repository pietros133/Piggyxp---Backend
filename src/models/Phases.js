import { EntitySchema } from "typeorm";
import { Unit } from "./Unit.js";

export const Phases = new EntitySchema({
  name: "Phases",
  tableName: "phases",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    tittle: {
      type: "varchar",
      length: 255,
      },

    order: {
        type: "int",
        default: 1
    },
  },

  relations: {
    unit: {
      type: "many-to-one",
      target: Unit,
      joinColumn: {
        name: "unit_id",
        referencedColumnName: "id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});