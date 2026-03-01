import { EntitySchema } from "typeorm";

export const Phases = new EntitySchema({
  name: "Phases",
  columns: {
    _id: {
      primary: true,
      type: "objectId",
      objectId: true,
    },
    order: {
      type: Number,
    },
    dificulty: {
      type: Number,
    },
    text: {
      type: String,
    },
    questions: {
      type: "simple-json", 
      nullable: true,
    },
    rewards: {
      type: "simple-json", 
      nullable: true,
    },
    unit: {
      type: String,
      nullable: true, 
    },
  },
});