import  useCalendar  from '../hooks/useCalendar'
import React from 'react';
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import EventForm from './EventForm';

export default function Calendar (){
  const {
    currentDate,
    calendarDates,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getEventsForDate,
	selectedDate, 
	setSelectedDate
  } = useCalendar();
  
  return (
        <div className="max-w-full lg:max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-2xl border border-blue-100"> {/* Updated: Main calendar container styling */}
      <div className="mb-6"> {/* Header section */}
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> {/* Grid for Calendar Body and Event Panel */}
        <div className="lg:col-span-2"> {/* Calendar Grid takes 2/3 of the width on large screens */}
          <CalendarGrid
            dates={calendarDates}
            currentDate={currentDate}
            getEventsForDate={getEventsForDate}
            selectedDate={selectedDate} // Pass selectedDate
            setSelectedDate={setSelectedDate} // Pass setSelectedDate
          />
        </div>

        <div className="lg:col-span-1"> {/* Event Form/Details takes 1/3 of the width on large screens */}
          <EventForm
            selectedDate={selectedDate}
            eventsForSelectedDate={getEventsForDate(selectedDate)}
          />
        </div>
      </div>
    </div>
  );
};
