import  useCalendar  from '../hooks/useCalendar'
import React from 'react';
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'

export default function  Calendar() {
  const {
    currentDate,
    calendarDates,
    goToPreviousMonth,
    goToNextMonth
  } = useCalendar();
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />
      
      <CalendarGrid
        dates={calendarDates}
        currentDate={currentDate}
      />
    </div>
  );
};