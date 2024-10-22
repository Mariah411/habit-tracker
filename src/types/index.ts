export interface IHabbit {
  id: string | number;
  name: string;
  // completed: boolean
  days: boolean[];
  // days: (boolean | undefined) []
}

export interface ICompleteHabbit {
  id: string | number;
  // id_habbit: string | number;
  date: Date;
}
