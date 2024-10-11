import { useMemo, useState } from "react";
import DayTabs from "../components/DayTabs";
// import DayButton from "../components/ui/DayButton/DayButton";
import dayjs, { Dayjs } from "dayjs";
import HabbitTask from "../components/HabbitTask";

const TaskPage = () => {
  const today = useMemo(
    () => dayjs().set("hour", 0).set("minute", 0).set("second", 0),
    []
  );

  const [currDay, setCurrDay] = useState<Dayjs>(today);

  return (
    <>
      {/* <div>TaskPage</div> */}
      <DayTabs today={today} currDay={currDay} setCurrDay={setCurrDay} />

      <HabbitTask done />

      <div className="inline-flex items-center justify-start w-full">
        <div className="absolute px-4 text-gray-300  transform -translate-y-1 bg-white font-medium dark:bg-gray-900">
          <div className="inline-flex justify-between">
            <span>Выполнено</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </div>
        </div>
        <hr className="w-full h-1 my-5 bg-gray-200 border-0 rounded dark:bg-gray-700" />
      </div>
      <HabbitTask />
    </>
  );
};

export default TaskPage;
