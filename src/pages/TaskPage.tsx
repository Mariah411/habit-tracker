import { useEffect, useMemo, useState } from "react";
import DayTabs from "../components/DayTabs";
// import DayButton from "../components/ui/DayButton/DayButton";
import dayjs, { Dayjs } from "dayjs";
import HabbitTask from "../components/HabbitTask";
import Modal from "../components/ui/Modal/Modal";

import { useLiveQuery } from "dexie-react-hooks";
import FloatingButton from "../components/ui/Button/FloatingButton";
import Form from "../components/ui/Form/Form";
import Loader from "../components/ui/Loader/Loader";
import { getTasks } from "../service/HabbitService";

import "react-toastify/dist/ReactToastify.css";

// type FormFields = {
//   name: string;
//   days: boolean[];
// };

const Divider = () => (
  <div className="inline-flex items-center justify-start w-full">
    <div className="absolute px-4 text-gray-300  transform -translate-y-1 bg-white font-medium dark:bg-gray-900">
      <div className="inline-flex justify-between">
        <span>Выполнено</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </span>
      </div>
    </div>
    <hr className="w-full h-1 my-5 bg-gray-200 border-0 rounded dark:bg-gray-700" />
  </div>
);

const TaskPage = () => {
  const today = useMemo(
    () =>
      dayjs()
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0),
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [currDay, setCurrDay] = useState<Dayjs>(today);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setCurrDay(today);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const currDayTasks = useLiveQuery(() => {
    setHasChanges(false);
    return getTasks(currDay);
  }, [currDay, hasChanges]);

  if (!currDayTasks) return null;

  // const notify = () => toast("Wow so easy !");

  return (
    <>
      <DayTabs today={today} currDay={currDay} setCurrDay={setCurrDay} />
      {isLoading && <Loader />}

      <div className="pb-16">
        {currDayTasks.uncompleted.map((task) => {
          return (
            <HabbitTask
              key={task.id}
              {...task}
              setHasChanges={setHasChanges}
              date={currDay.toDate()}
            />
          );
        })}

        <Divider />

        {currDayTasks.completed.map((task) => {
          return (
            <HabbitTask
              key={task.id}
              setHasChanges={setHasChanges}
              {...task}
              date={currDay.toDate()}
            />
          );
        })}

        <FloatingButton onClick={handleOpen} />
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          header="Создание привычки"
        >
          <Form handleClose={handleClose} mode="add" />
        </Modal>
      </div>
    </>
  );
};

export default TaskPage;
