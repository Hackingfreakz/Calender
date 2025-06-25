import useCalendar from '../hooks/useCalendar';
import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventForm from './EventForm'; // Import the new EventForm component

export default function Calendar() {
  const {
    currentDate,
    calendarDates,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getEventsForDate,
    selectedDate, // Get selectedDate from hook
    setSelectedDate // Get setSelectedDate from hook
  } = useCalendar();
  
  return (
    <div className="max-w-full lg:max-w-7xl mx-auto p-4 md:p-6 lg:p-8 bg-white bg-opacity-600 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-100"> {/* Updated: bg-opacity for more transparency, backdrop-blur for nice effect */}
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
}