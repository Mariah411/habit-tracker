import { FC } from "react";

const CheckIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const UndoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

type Props = {
  done?: boolean;
};
const HabbitTask: FC<Props> = (props: Props) => {
  const { done } = props;
  return (
    <>
      {done ? (
        <>
          <div className="max-w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between relative">
            <div>
              <h5 className="mb-2 pr-14 text-l font-bold tracking-tight text-gray-900 dark:text-white">
                Привычка
              </h5>
            </div>

            <a className="bg-primary absolute top-0 bottom-0 right-0 w-14 rounded-r-lg flex justify-center items-center text-white">
              <CheckIcon />
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-full p-6 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between relative">
            <div>
              <h5 className="mb-2 pr-14 text-l font-bold tracking-tight text-gray-400 dark:text-white">
                Привычка
              </h5>
            </div>

            <a className="bg-secondary absolute top-0 bottom-0 right-0 w-14 rounded-r-lg flex justify-center items-center text-primary">
              <UndoIcon />
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default HabbitTask;
