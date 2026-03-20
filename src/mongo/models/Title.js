import { EntitySchema } from "typeorm";

export const Titles = new EntitySchema({
  name: "Titles",
  columns: {
    _id: {
      primary: true,
      type: "objectId",
      objectId: true,
    },
    difficulty: {
      type: Number,
      nullable: false
    },
    unit: {
      type: Number,
      nullable: false, 
    },
    tittle: {
        type: String,
        nullable: false
    }
  },
});