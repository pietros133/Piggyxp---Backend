import { EntitySchema } from "typeorm";

export const Mission = new EntitySchema({
  name: "Mission",
  tableName: "missions",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },

    name: {
      type: "varchar",
      length: 255,
      nullable: false
    },

    type: {
      type: "varchar",
      length: 50,
      nullable: false,
      comment: "complete_phases | correct_answers | streak | etc",
    },

    target: {
      type: "int",
      comment: "quantidade necessária",
      nullable: false
    },

    condition: {
      type: "varchar",
      length: 50,
      nullable: true,
      comment: "ex: no_errors",
    },

    frequency: {
      type: "varchar",
      length: 20,
      nullable: false,
      comment: "daily | weekly | monthly",
    },

    xp: {
      type: "int",
      nullable: false
    },

    coins: {
      type: "int",
      nullable: false
    },
  },
});