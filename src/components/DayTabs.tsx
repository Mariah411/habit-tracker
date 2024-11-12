import { FC, useContext } from "react";

import dayjs, { Dayjs } from "dayjs";

import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import { useMemo } from "react";
import { TodayContext } from "../contexts";
import Button from "./ui/Button/Button";

type Props = {
  currDay?: Dayjs;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrDay?: any;
  setChangingDay: any;
};

dayjs.extend(weekday);
dayjs.extend(calendar);

const DayTabs: FC<Props> = (props: Props) => {
  const { currDay, setCurrDay, setChangingDay } = props;
  const today = useContext(TodayContext);
  const week = useMemo(() => {
    const w: Dayjs[] = [] as Dayjs[];
    const todayNum = dayjs(today).weekday();

    for (let i = todayNum - 6; i <= todayNum; i++) {
      w.push(
        dayjs(today)
          .weekday(i)
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0)
      );
    }
    return w;
  }, [today]);

  // const handleClick = (day) => {
  //   setChangingDay(true);
  //   setCurrDay(day);
  //   setChangingDay(true);
  // };

  return (
    <>
      <div className="sticky dark:bg-gray-800  dark:border-gray-700  top-0 z-40 bg-white max-w-full border border-gray-200 rounded-b-lg shadow shadow-lg py-5">
        <div className="flex justify-evenly">
          {week.map((day) => (
            <span key={day.day()}>
              {day.isSame(today) ? (
                <div className="relative">
                  <Button
                    onClick={() => {
                      setChangingDay(true);
                      setCurrDay(day);
                      setTimeout(() => setChangingDay(false), 500);
                    }}
                    variant={"contained"}
                    // classes={`flex flex-col p-1 text-xs md:p-2 md:text-sm  justify-center items-center  md:flex-row md:justify-around ${
                    //   day.isSame(currDay) ? "primary" : "secondary"
                    // } `}

                    classes="flex flex-col p-0.5 text-[11px] midphone:text-xs midphone:p-1 sm:p-2 sm:text-sm  justify-center items-center  md:flex-row md:justify-around "
                    color={day.isSame(currDay) ? "primary" : "secondary"}
                  >
                    <>
                      {/* {day.format("DD MMM dd")} */}
                      <span className="md:mr-1">{day.format("DD MMM")}</span>
                      <span>{day.format("dd")}</span>
                    </>
                  </Button>
                  <span className="bottom-0 right-0 absolute w-2.5 h-2.5 transform translate-y-1/4 translate-x-1/4 bg-green-400  rounded-full"></span>
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setChangingDay(true);
                      setCurrDay(day);
                      setTimeout(() => setChangingDay(false), 500);
                    }}
                    variant={"contained"}
                    // classes={`flex flex-col p-1 text-xs md:p-2 md:text-sm  justify-center items-center  md:flex-row md:justify-around ${
                    //   day.isSame(currDay) ? "primary" : "secondary"
                    // } `}
                    classes="flex flex-col p-0.5 text-[11px] midphone:text-xs midphone:p-1 sm:p-2 sm:text-sm  justify-center items-center  md:flex-row md:justify-around "
                    color={day.isSame(currDay) ? "primary" : "secondary"}
                  >
                    <>
                      {/* {day.format("DD MMM dd")} */}
                      <span className="md:mr-1">{day.format("DD MMM")}</span>
                      <span>{day.format("dd")}</span>
                    </>
                  </Button>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default DayTabs;
