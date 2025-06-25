import React,{useState,useMemo} from 'react';
import dayjs from 'dayjs'
import {dateUtils}from '../utils/dateUtils'
import {eventsData }from '../data/events'
export default function useCalendar(){
  
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events] = useState(eventsData.events);
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  
  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentDate(prev => prev.subtract(1, 'month'));
    } else if (direction === 'next') {
      setCurrentDate(prev => prev.add(1, 'month'));
    }
  };
  
  const goToPreviousMonth = () => navigateMonth('prev');
  const goToNextMonth = () => navigateMonth('next');
  const goToToday = () => setCurrentDate(dayjs());
  
  const calendarDates = useMemo(() => 
    dateUtils.generateCalendarDates(currentDate), 
    [currentDate]
  );
  
  // Get events for each date with overlap detection
  const getEventsForDate = (date) => {
    const dateEvents = dateUtils.getEventsForDate(date, events);
    const overlappingGroups = dateUtils.detectOverlappingEvents(dateEvents);
    
    return dateEvents.map(event => ({
      ...event,
      isOverlapping: overlappingGroups.some(group => group.includes(event.id)),
      overlapGroup: overlappingGroups.find(group => group.includes(event.id)) || []
    }));
  };
  
  return {
    currentDate,
    calendarDates,
    events,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getEventsForDate,
	selectedDate,
  setSelectedDate
  };
};