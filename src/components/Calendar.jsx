import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setDate } from "../features/dateSelection/dateSelectSlice";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prevButton, setPrevButton] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const dispatch = useDispatch();

  const nextMonthDate = new Date(currentDate);
  const today = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const getCurrentMonthYear = () => {
    const month = currentDate.toLocaleDateString("default", { month: "long" });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };

  const getNextMonthYear = () => {
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

  const isBeforeTodayInCurrentMonth = (day, month, year) => {
    const today = new Date();
    if (month !== today.getMonth() || year !== today.getFullYear())
      return false;
    const current = new Date(year, month, day);
    return current < today.setHours(0, 0, 0, 0);
  };

  const currentMonthDays = generateDays(
    currentDate.getMonth(),
    currentDate.getFullYear(),
  );
  const nextMonthDays = generateDays(
    nextMonthDate.getMonth(),
    nextMonthDate.getFullYear(),
  );

  const goToNextMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(newDate);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(newDate);
  };

  const isPreviousButtonDisabled = () => {
    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth()
    );
  };

  const handleDateSelect = (day, month, year) => {
    if (!day) return;

    const selectedDate = new Date(year, month, day);
    selectedDate.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate < startDate) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);

      const dateRange = {
        start: startDate.toISOString(),
        end: selectedDate.toISOString(),
      };
      console.log(dateRange);
      dispatch(setDate(dateRange));
    }
  };

  useEffect(() => {
    setPrevButton(!isPreviousButtonDisabled());
  }, [currentDate]);

  useEffect(() => {
    console.log(`Start date: ${startDate}`);
  }, [startDate]);

  return (
    <>
      <div className="calendar top-16 z-10 mx-4 mt-3 grid max-h-[400px] justify-between overflow-y-scroll rounded-3xl border-gray-400 bg-white p-0 py-4 shadow-2xl md:absolute md:mx-0 md:flex md:w-full md:px-9">
        <div className="w-full px-6 md:w-[49%]">
          <h2 className="relative flex items-center justify-around pb-8 pt-6 text-center font-semibold">
            {getCurrentMonthYear()}
            {prevButton && (
              <FaChevronLeft
                className="absolute left-0"
                onClick={goToPreviousMonth}
              />
            )}
          </h2>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
              <div key={index} className="text-gray-500">
                {day}
              </div>
            ))}
            {currentMonthDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day grid h-12 w-12 items-center rounded-[50%] font-semibold hover:bg-black hover:text-white ${!day || isBeforeTodayInCurrentMonth(day, currentDate.getMonth(), currentDate.getFullYear()) ? "inactive" : ""}`}
                onClick={() =>
                  handleDateSelect(
                    day,
                    currentDate.getMonth(),
                    currentDate.getFullYear(),
                  )
                }
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full px-6 transition-all duration-500 md:w-[49%]">
          <div className="relative">
            <h2 className="mb-8 mt-6 flex items-center justify-around text-center font-semibold">
              {getNextMonthYear()}
              <FaChevronRight
                className="absolute right-0"
                onClick={goToNextMonth}
              />
            </h2>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-gray-500">
                {day}
              </div>
            ))}
            {nextMonthDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day grid h-12 w-12 items-center rounded-[50%] font-semibold hover:bg-black hover:text-white ${!day ? "inactive" : ""}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
