import { useState } from "react";
import DatePicker from "../components/ui/DatePicker/DatePicker";

const ReportPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  // function tileContent({ date, view }) {
  //   // Add class to tiles in month view only
  //   if (view === "month") {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     // return <span className="w-5 h-5 !bg-rose-500 border-r-8"></span>;
  //     // if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
  //     //   return 'My content';
  //     // }
  //     return (
  //       <div className="absolute w-1.5 h-1.5 bottom-1 right-1/2 transform translate-x-1/2 bg-rose-300 rounded-full"></div>
  //     );
  //   }
  // }

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      // if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
      //   return 'myClassName';
      // }

      return "myClassName";
    }
  }

  return (
    <div>
      <DatePicker />
    </div>
  );
};

export default ReportPage;
