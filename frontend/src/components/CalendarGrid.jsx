import React from 'react';
import {dateUtils} from '../utils/dateUtils'
export default function CalendarGrid ({ dates, currentDate }){
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Week days header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map(day => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50"
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
          
          return (
            <div
              key={index}
              className={`
                relative min-h-[100px] p-2 border-r border-b border-gray-100
                ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white text-gray-900'}
                hover:bg-gray-50 cursor-pointer transition-colors
              `}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`
                    inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full
                    ${isToday 
                      ? 'bg-blue-600 text-white' 
                      : isCurrentMonth 
                        ? 'text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-400'
                    }
                  `}
                >
                  {date.format('D')}
                </span>
              </div>
              
              {/* Event space - will be populated in later phases */}
              <div className="mt-1 space-y-1">
                {/* Events will go here */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
