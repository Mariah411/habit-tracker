import { Dayjs } from "dayjs";
import { IHabbit } from "../types";
import { db } from "./db";

export const getHabbits = async () => {
  return await db.habbits.toArray();
};

export const AddHabbit = async (habbitName: string, days: boolean[]) => {
  return await db.habbits.add({
    name: habbitName,
    days,
  });
};

export const EditHabbit = async (
  id: number | string,
  name: string,
  days: boolean[]
) => {
  return await db.habbits.update(id, { name, days });
};

export const DeleteHabbit = async (id: number | string) => {
  await db.habbits.delete(id);
};

export const complyHabbit = async (id: number | string, today: Date) => {
  await db.complete_habbits.put({ id: id, date: today }); // compound index
};

export const cancelHabbit = async (id: number | string, today: Date) => {
  await db.complete_habbits.where({ id: id, date: today }).delete();
};

export const isHabbitComplete = async (id: number | string, date: Date) => {
  const is_complete = await db.complete_habbits
    // .where({ id_habbit, date })
    .where("[id+date]")
    .equals([id, date])
    .count();
  // console.log(id, date, is_complete);
  return Boolean(is_complete);
};

export const getTasks = async (currDay: Dayjs) => {
  const habbits_arr = await db.habbits
    .filter((h) => h.days[currDay.day()])
    .toArray();

  const completed: (IHabbit & { done: boolean })[] = [];
  const uncompleted: (IHabbit & { done: boolean })[] = [];

  for (const h of habbits_arr) {
    await isHabbitComplete(h.id, currDay.toDate()).then((done) =>
      done
        ? completed.push({ ...h, done: done })
        : uncompleted.push({ ...h, done: done })
    );
  }

  return { completed, uncompleted };
};

export const getComplitedTasks = async (currDay: Dayjs) => {
  return (await getTasks(currDay)).completed;
};

export const getUncomplitedTasks = async (currDay: Dayjs) => {
  return (await getTasks(currDay)).uncompleted;
};

export const getHabbitMonthReport = async (
  id: number | string,
  month: { startOfMonth: Dayjs; endOfMonth: Dayjs }
) => {
  return await db.complete_habbits
    .where(["id+date"])
    .between(
      [id, month.startOfMonth.toDate()],
      [id, month.endOfMonth.toDate()],
      true,
      true
    )
    .toArray();
};
