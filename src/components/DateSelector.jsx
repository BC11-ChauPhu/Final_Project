import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      className="w-full overflow-x-scroll text-sm underline"
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal
    />
  );
};

export default DateSelector;
