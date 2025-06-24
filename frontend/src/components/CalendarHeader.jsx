import React from 'react';
import Button from './Button'
export default function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }){
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentDate.format('MMMM YYYY')}
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={onPrevMonth}
          className="p-2"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        
        <Button
          variant="outline"
          onClick={onNextMonth}
          className="p-2"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};
