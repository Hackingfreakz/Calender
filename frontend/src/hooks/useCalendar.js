import React,{useState} from 'react';
import dayjs from 'dayjs'
import {dateUtils}from '../utils/dateUtils'
export default function useCalendar () {
  const [currentDate, setCurrentDate] = useState(dayjs());
  
  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentDate(prev => prev.subtract(1, 'month'));
    } else if (direction === 'next') {
      setCurrentDate(prev => prev.add(1, 'month'));
    }
  };
  
  const goToPreviousMonth = () => navigateMonth('prev');
  const goToNextMonth = () => navigateMonth('next');
  
  const calendarDates = dateUtils.generateCalendarDates(currentDate);
  
  return {
    currentDate,
    calendarDates,
    goToPreviousMonth,
    goToNextMonth
  };
};
