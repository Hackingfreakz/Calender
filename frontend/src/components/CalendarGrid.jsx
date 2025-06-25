import React from 'react';
import {dateUtils} from '../utils/dateUtils'
import {eventsData }from '../data/events'
import EventItem from './EventItem'

export default function CalendarGrid ({ dates, currentDate, getEventsForDate }){
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Week days header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-4 text-center text-sm font-semibold text-gray-700 bg-gray-50 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar dates grid */}
      <div className="grid grid-cols-7">
        {dates.map((date, index) => {
          const isToday = dateUtils.isToday(date);
          const isCurrentMonth = dateUtils.isCurrentMonth(date, currentDate);
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents.length > 0;
          const maxVisibleEvents = 3;
          const hiddenEventsCount = Math.max(0, dayEvents.length - maxVisibleEvents);
          
          return (
            <div
              key={index}
              className={`
                relative min-h-[120px] p-2 border-r border-b border-gray-100 last:border-r-0
                ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}
                hover:bg-gray-50 cursor-pointer transition-colors
              `}
            >
              {/* Date number */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`
                    inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full
                    ${isToday 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : isCurrentMonth 
                        ? 'text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-400'
                    }
                  `}
                >
                  {date.format('D')}
                </span>
                
                {/* Event count indicator */}
                {hasEvents && (
                  <div className={`
                    text-xs font-medium px-2 py-1 rounded-full
                    ${isCurrentMonth ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {dayEvents.length}
                  </div>
                )}
              </div>
              
              {/* Events */}
              <div className="space-y-1 overflow-hidden">
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
                  <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors">
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
