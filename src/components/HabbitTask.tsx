import { FC, useEffect, useState } from "react";
import { cancelHabbit, complyHabbit } from "../service/HabbitService";
import { IHabbit } from "../types";
import { CheckIcon, UndoIcon } from "./ui/Icons";

type Props = IHabbit & {
  done: boolean;
  date: Date;
  setHasChanges: any;
};

const HabbitTask: FC<Props> = (props: Props) => {
  const { id, name, done, date, setHasChanges } = props;

  const [isCompleted, setIsCompleted] = useState<boolean>(done || false);

  useEffect(() => {
    if (done !== undefined) setIsCompleted(Boolean(done));
  }, [done, date]);

  const comply = async () => {
    await complyHabbit(id, date);
    setIsCompleted(true);
    setHasChanges(true);
  };

  const cancel = async () => {
    await cancelHabbit(id, date);
    setIsCompleted(false);
    setHasChanges(true);
  };

  return (
    <>
      {!isCompleted ? (
        <>
          <div className=" max-w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between relative">
            <div>
              <a
                className="bg-primary active:scale-105 absolute top-0 bottom-0 left-0 w-14 rounded-l-lg flex justify-center items-center text-white hover:bg-primary-light"
                onClick={comply}
              >
                <CheckIcon />
              </a>
              <h5 className="mb-2 pl-14 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h5>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between relative">
            <div>
              <a
                className="bg-secondary active:scale-105 absolute top-0 bottom-0 left-0 w-14 rounded-l-lg flex justify-center items-center text-primary hover:bg-secondary-dark"
                onClick={cancel}
              >
                <UndoIcon />
              </a>
              <h5 className="mb-2 pl-14 text-l font-bold tracking-tight text-gray-400 dark:text-white">
                {name}
              </h5>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HabbitTask;
