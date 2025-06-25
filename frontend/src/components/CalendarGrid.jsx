import React from 'react';
import {dateUtils} from '../utils/dateUtils'
import EventItem from './EventItem'

export default function CalendarGrid ({ dates, currentDate, getEventsForDate, selectedDate, setSelectedDate }){
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="rounded-lg shadow-xl border border-blue-200 overflow-hidden bg-white bg-opacity-60"> {/* Updated: bg-opacity for more transparency */}
      {/* Week days header */}
      <div className="grid grid-cols-7 border-b border-blue-200 bg-blue-50 bg-opacity-70"> {/* Updated: Blue header background and more opacity */}
        {weekDays.map(day => (
          <div
            key={day}
            className="p-3 text-center text-xs md:text-sm font-semibold text-blue-800 border-r border-blue-100 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar dates grid */}
      <div className="grid grid-cols-7 min-h-[500px]"> {/* Added min-height for consistent grid size */}
        {dates.map((date, index) => {
          const isToday = dateUtils.isToday(date);
          const isCurrentMonth = dateUtils.isCurrentMonth(date, currentDate);
          const isSelected = dateUtils.isSameDay(date, selectedDate); // Check if this date is the selected one
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents.length > 0;
          const maxVisibleEvents = 3;
          const hiddenEventsCount = Math.max(0, dayEvents.length - maxVisibleEvents);
          
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedDate(date);
              }}
              className={`relative min-h-[120px] md:min-h-[140px] p-2 border-r border-b border-blue-100 last:border-r-0
                ${!isCurrentMonth ? 'bg-blue-50 bg-opacity-40 text-gray-600' : 'bg-white bg-opacity-60 text-gray-900'} {/* Adjusted opacity for out-of-month and current month cells */}
                ${isSelected ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-300' : ''} {/* Highlight selected date */}
                hover:bg-blue-50 cursor-pointer transition-all duration-200 ease-in-out
              `}
            >
              {/* Date number */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`
                    inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 text-sm font-bold rounded-full
                    ${isToday
                      ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg'
                      : isSelected // If not today, but is selected
                        ? 'bg-blue-600 text-white'
                        : !isCurrentMonth
                          ? 'text-gray-500'
                          : 'text-gray-900 hover:bg-blue-50' // Default current month date
                    }
                    transition-all duration-200
                  `}
                >
                  {date.format('D')}
                </span>
                
                {/* Event count indicator */}
                {hasEvents && (
                  <div className={`
                    text-xs font-medium px-2 py-1 rounded-full
                    ${isCurrentMonth ? 'bg-blue-100 bg-opacity-60 text-blue-700' : 'bg-gray-100 bg-opacity-60 text-gray-600'} {/* Adjusted opacity for event count */}
                  `}>
                    {dayEvents.length}
                  </div>
                )}
              </div>
              
              {/* Events */}
              <div className="space-y-1 overflow-hidden pr-1"> {/* Added pr-1 to prevent scrollbar overlap */}
                {dayEvents.slice(0, maxVisibleEvents).map((event) => (
                  <EventItem
                    key={event.id}
                    event={event}
                    isOverlapping={event.isOverlapping}
                    overlapCount={event.overlapGroup.length}
                  />
                ))}
                
                {/* Show more indicator */}
                {hiddenEventsCount > 0 && (
                  <div className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 bg-opacity-60 rounded cursor-pointer hover:bg-blue-100 transition-colors"> {/* Adjusted opacity */}
                    +{hiddenEventsCount} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};