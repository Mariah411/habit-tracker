import { useContext, useEffect, useState } from "react";
import DayTabs from "../components/DayTabs";
// import DayButton from "../components/ui/DayButton/DayButton";
import dayjs, { Dayjs } from "dayjs";
import HabbitTask from "../components/HabbitTask";
import Modal from "../components/ui/Modal/Modal";

import { useLiveQuery } from "dexie-react-hooks";

import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import FloatingButton from "../components/ui/Button/FloatingButton";
import Form from "../components/ui/Form/Form";
import { TodayContext } from "../contexts";
import { getTasks } from "../service/HabbitService";

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
  const today = useContext(TodayContext);

  const [currDay, setCurrDay] = useState<Dayjs>(dayjs(today));
  const [changingDay, setChangingDay] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setCurrDay(dayjs(today));
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const currDayTasks = useLiveQuery(() => {
    setHasChanges(false);
    return getTasks(currDay);
  }, [currDay, hasChanges]);

  if (!currDayTasks) return null;

  const TasksGroup = (type: "complited" | "uncomplited") => {
    const currArr =
      type === "complited" ? currDayTasks.completed : currDayTasks.uncompleted;
    const emptyText =
      type === "complited"
        ? "Нет выполненных задач..."
        : "Все задачи выполнены!";

    // currArr = currArr.map((val) => {
    //   return { ...val, nodeRef: createRef(null) };
    // });

    if (currArr.length === 0)
      return (
        <div className="p-2 text-center text-gray-300 font-semibold">
          {emptyText}
        </div>
      );
    return (
      <TransitionGroup component="ul">
        {currArr.map((task) => {
          return (
            <CSSTransition
              appear={true}
              enter={!changingDay}
              exit={!changingDay}
              key={task.id}
              timeout={300}
              // nodeRef={task.nodeRef}
              classNames="item"
            >
              <li className="item">
                <HabbitTask
                  key={task.id}
                  {...task}
                  setHasChanges={setHasChanges}
                  date={currDay.toDate()}
                />
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  };

  return (
    <>
      <DayTabs
        setChangingDay={setChangingDay}
        currDay={currDay}
        setCurrDay={setCurrDay}
      />

      <div className="pb-16">
        <div className={`task-list ${changingDay && "task-list-exit-active"} `}>
          {currDayTasks.completed.length === 0 &&
          currDayTasks.uncompleted.length === 0 ? (
            <div className="p-2 text-center text-gray-300 font-semibold">
              Нет текущих задач...
            </div>
          ) : (
            <>
              {TasksGroup("uncomplited")}
              <Divider />
              {TasksGroup("complited")}
            </>
          )}
        </div>

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
