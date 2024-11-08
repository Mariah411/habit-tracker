import { useRef, useState } from "react";
import { Calendar } from "react-calendar";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

type View = "century" | "decade" | "year" | "month";

type Props = {
  value: Value;
  onChange: any;
};

const DatePicker = (props: Props) => {
  const { value, onChange } = props;
  // const [value, onChange] = useState<Value>(currDate);
  const [isFocused, setIsFocused] = useState(false);
  const [calendarView, setCalendarView] = useState<View>("year");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const boxRef = useRef(null);

  const onClickMonth = (value, event) => {
    setCalendarView("year");
    onChange(value);
    console.log("Clicked month: ", value);
  };

  const onViewChange = ({ action, activeStartDate, value, view }) => {
    switch (view) {
      case "decade":
        setCalendarView("decade");
        break;
      case "year":
        setCalendarView("year");
        break;
    }
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-white max-w-full  border border-gray-200 rounded-b-lg shadow shadow-lg p-1 mb-2">
        <div className="w-full flex justify-start items-center p-3 rounded-md ">
          <Button onClick={handleFocus} classes="text-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </Button>

          <h2 className="font-semibold grow text-center">
            {`Отчет за ${new Date(value?.toString() || "").toLocaleString(
              "ru-RU",
              {
                month: "long",
                year: "numeric",
              }
            )}`}{" "}
          </h2>
        </div>
      </div>

      <Modal
        header="Выбор месяца"
        showModal={isFocused}
        setShowModal={setIsFocused}
        width={300}
      >
        {/* // <span className="inline-block relative calendar-container" ref={boxRef}>
        //   <span className=" absolute z-40"> */}
        <Calendar
          // navigationAriaLive="off"
          defaultValue={value}
          onChange={onChange}
          value={value}
          view={calendarView}
          onClickMonth={onClickMonth}
          // maxDetail="year"
          next2Label={null}
          prev2Label={null}
          onViewChange={onViewChange}
          locale="ru"
          // tileContent={tileContent}
          // tileClassName={tileClassName}
        />
      </Modal>
    </>
  );
};

export default DatePicker;
