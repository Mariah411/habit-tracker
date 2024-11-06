import dayjs, { Dayjs } from "dayjs";
import { useLiveQuery } from "dexie-react-hooks";
import { FC, useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import DatePicker, { Value } from "../components/ui/DatePicker/DatePicker";
import { db } from "../service/db";
import { getHabbitMonthReport } from "../service/HabbitService";
import { IHabbit } from "../types";

type HabbitReportProps = {
  habbit: IHabbit;
  // currDate: Value;
  month: { startOfMonth: Dayjs; endOfMonth: Dayjs };
  today: Date;
};

const HabbitReport: FC<HabbitReportProps> = (props: HabbitReportProps) => {
  const { habbit, month, today } = props;

  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const hDays = useLiveQuery(() => {
    return getHabbitMonthReport(habbit.id, month);
  }, [month]);

  useEffect(() => {
    if (hDays) {
      setHighlightedDays(hDays.map((el) => el.date.getDate()));
    }
  }, [hDays]);

  function tileClassName({ date, view }) {
    const inFuture = date > today;
    const isSelected = highlightedDays.indexOf(date.getDate()) >= 0;

    const mustBeDone = habbit.days[date.getDay()];
    const isToday = date.setSeconds(0, 0) === today;

    if (view === "month") {
      let classes = "";
      if (isSelected) classes += " done";
      if (!isSelected && mustBeDone && !inFuture) classes += " missed";
      if (mustBeDone && inFuture) classes += " future";
      if (isToday) classes += " today";
      return classes;
    }
  }

  // value={month.startOfMonth.toDate()
  return (
    <div className="w-full flex flex-col items-center mt-1 mb-3">
      <div className="w-[280px] p-1 bg-gray-100 text-center rounded-md">
        <h5 className="font-semibold">{habbit.name}</h5>
      </div>
      <Calendar
        showNavigation={false}
        minDetail="month"
        next2Label={null}
        nextLabel={null}
        prev2Label={null}
        prevLabel={null}
        showNeighboringMonth={false}
        tileClassName={tileClassName}
        tileDisabled={() => true}
        // value={month.startOfMonth.toDate()}
        activeStartDate={month.startOfMonth.toDate()}
      />
    </div>
  );
};
const ReportPage = () => {
  const habbits_arr = useLiveQuery(() => db.habbits.toArray());

  const today = new Date().setHours(0, 0, 0, 0);

  const startOfCurrMonth = useMemo(() => {
    return dayjs()
      .set("date", 1)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0);
  }, []);
  const [currDate, setCurrDate] = useState<Value>(startOfCurrMonth.toDate());

  const [month, setMonth] = useState({
    startOfMonth: dayjs(currDate?.toString()).startOf("month"),
    endOfMonth: dayjs(currDate?.toString()).endOf("month"),
  });

  useEffect(() => {
    setMonth({
      startOfMonth: dayjs(currDate?.toString()).startOf("month"),
      endOfMonth: dayjs(currDate?.toString()).endOf("month"),
    });
  }, [currDate]);

  if (!habbits_arr) return null;
  return (
    <div>
      {/* <div className="flex justify-start items-center">
        <span>Выберите месяц:</span> */}

      <DatePicker value={currDate} onChange={setCurrDate} />
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-2">
        {habbits_arr.map((habbit) => (
          <HabbitReport
            key={habbit.id}
            habbit={habbit}
            month={month}
            today={today}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
