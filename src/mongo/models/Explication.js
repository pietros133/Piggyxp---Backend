import { EntitySchema } from "typeorm";

export const Explication = new EntitySchema({
  name: "Explications",
  columns: {
    _id: {
      primary: true,
      type: "objectId",
      objectId: true,
    },
    unit: {
      type: String,
      nullable: true, 
    },
    dificulty: {
      type: Number,
    },
    tittle: {
        type: Text,
    },
    flashcards: {
        type: "simple-json",
        nullable: true,
    }
  },
});