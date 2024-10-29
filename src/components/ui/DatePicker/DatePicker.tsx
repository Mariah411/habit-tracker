import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const boxRef = useRef(null);

  useEffect(() => {
    window.onclick = (event) => {
      if (
        event.target.contains(boxRef.current) &&
        event.target !== boxRef.current
      ) {
        handleBlur();
      } else {
        handleFocus();
      }
    };
  }, []);

  return (
    <>
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          onFocus={handleFocus}
          type="text"
          className="input ps-10 p-2.5"
          placeholder="Выберите дату"
        />
      </div>
      {isFocused && (
        <span className="inline-block" ref={boxRef}>
          <Calendar
            onChange={onChange}
            value={value}
            // tileContent={tileContent}
            // tileClassName={tileClassName}
          />
        </span>
      )}
    </>
  );
};

export default DatePicker;
