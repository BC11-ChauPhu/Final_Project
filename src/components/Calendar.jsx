import React, { useEffect } from "react";

const Calendar = () => {
  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const getCurrentMonthYear = () => {
    const month = currentDate.toLocaleDateString("default", { month: "long" });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };

  const getNextMonth = () => {
    const nextMonth = nextMonthDate.toLocaleDateString("default", {
      month: "long",
    });
    const year = nextMonthDate.getFullYear();
    return `${nextMonth} ${year}`;
  };

  const generateDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push("");
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  const currentMonthDays = generateDays(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );
  const nextMonthDays = generateDays(
    nextMonthDate.getMonth(),
    nextMonthDate.getFullYear(),
  );

  console.log(currentMonthDays);
  console.log(nextMonthDays);

  return (
    <div className="absolute top-16 mt-3 flex w-full justify-between rounded-3xl bg-white px-5 shadow-2xl">
      <div className="w-[45%]">
        <h2 className="text-center text-xl">{getCurrentMonthYear()}</h2>
        <div className="grid grid-cols-7 gap-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day}>{day}</div>
          ))}
          {currentMonthDays.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-center text-xl">{getNextMonth()}</h2>
        <div className="grid grid-cols-7 gap-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day}>{day}</div>
          ))}
          {nextMonthDays.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
