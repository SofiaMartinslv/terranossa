import React, { useState } from 'react';
import Day from './Day';
import Utils from '../../utils/Utils';

export default function Calendar({ activities, setCurrentDay }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  function handlePrevMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }

  function handleNextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }

  function renderCalendarDays() {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
      const date = new Date(year, month, i);
      const dateTime = date.getTime();
      const hasActivity = activities.some(
        (activity) => {
          const startDate = Utils.removeTime(activity.startDate).getTime();
          const endDate = Utils.removeTime(activity.endDate).getTime();

          return (startDate === dateTime || endDate === dateTime || (startDate < dateTime && endDate > dateTime))
        }
      );

      days.push(
        <Day 
          key={dateTime} 
          date={date}
          hasActivity={hasActivity} 
          isHeader={false} 
          setCurrentDay={setCurrentDay}
        >
          {i}
        </Day>);
    }

    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.unshift(<div className="calendar-day empty" key={`empty-${i}`} />);
    }

    return days;
  }

  return (
    <div className={"col-span-3 bg-neutral-100 rounded-lg shadow-md p-4 m-2 "}>
      <div 
        className="col-span-4 grid grid-cols-6 grid-rows-1 calendar-header mb-4">
        <button className="btn btn-primary col-span-1" onClick={handlePrevMonth}>
          Prev
        </button>
        <h2 className="text-center text-lg font-semibold col-span-4">
          {currentDate.toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button className="btn btn-primary col-span-" onClick={handleNextMonth}>
          Next
        </button>
      </div>
      <div className="calendar-grid row-span-2 col-span-4 grid grid-cols-7 gap-4">
        <Day isHeader={true}>Dom</Day>
        <Day isHeader={true}>Seg</Day>
        <Day isHeader={true}>Ter</Day>
        <Day isHeader={true}>Qua</Day>
        <Day isHeader={true}>Qui</Day>
        <Day isHeader={true}>Sex</Day>
        <Day isHeader={true}>Sáb</Day>
        {renderCalendarDays()}
      </div>
    </div>
  );
}
