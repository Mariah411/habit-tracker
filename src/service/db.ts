import Dexie, { EntityTable } from "dexie";
import { ICompleteHabbit, IHabbit } from "../types";

const db = new Dexie("HabbitsDatabase") as Dexie & {
  habbits: EntityTable<IHabbit, "id">;
  complete_habbits: EntityTable<ICompleteHabbit>;
};

// Schema declaration:
db.version(1).stores({
  habbits: "++id, name, days",
  complete_habbits: "[id+date]",
});

export { db };
