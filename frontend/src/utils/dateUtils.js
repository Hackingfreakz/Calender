import dayjs from 'dayjs'

const dateUtils = {
  // Get the first day of the month
  getFirstDayOfMonth: (date) => {
    return dayjs(date).startOf('month');
  },
  
  // Get the last day of the month
  getLastDayOfMonth: (date) => {
    return dayjs(date).endOf('month');
  },
  
  // Get the start of the week for the first day of month (for calendar grid)
  getCalendarStartDate: (date) => {
    const firstDay = dateUtils.getFirstDayOfMonth(date);
    return firstDay.startOf('week');
  },
  
  // Get the end of the week for the last day of month (for calendar grid)
  getCalendarEndDate: (date) => {
    const lastDay = dateUtils.getLastDayOfMonth(date);
    return lastDay.endOf('week');
  },
  
  // Generate array of dates for calendar grid (42 days - 6 weeks)
  generateCalendarDates: (date) => {
    const startDate = dateUtils.getCalendarStartDate(date);
    const dates = [];
    
    // Generate exactly 42 days (6 weeks) for consistent grid
    for (let i = 0; i < 42; i++) {
      dates.push(startDate.add(i, 'day'));
    }
    
    return dates;
  },
  
  // Check if date is today
  isToday: (date) => {
    return dayjs(date).isSame(dayjs(), 'day');
  },
  
  // Check if date is in current month
  isCurrentMonth: (date, currentMonth) => {
    return dayjs(date).isSame(currentMonth, 'month');
  },
  
  // Format time for display
  formatTime: (time) => {
    return dayjs(`2025-01-01 ${time}`).format('h:mm A');
  },
  
  // Check if two time ranges overlap
  doTimesOverlap: (start1, end1, start2, end2) => {
    const startTime1 = dayjs(`2025-01-01 ${start1}`);
    const endTime1 = dayjs(`2025-01-01 ${end1}`);
    const startTime2 = dayjs(`2025-01-01 ${start2}`);
    const endTime2 = dayjs(`2025-01-01 ${end2}`);
    
    return startTime1.isBefore(endTime2) && startTime2.isBefore(endTime1);
  },
  
  // Get events for a specific date
  getEventsForDate: (date, events) => {
    const dateString = dayjs(date).format('YYYY-MM-DD');
    return events.filter(event => event.date === dateString);
  },
  
  // Detect overlapping events
  detectOverlappingEvents: (events) => {
    const overlapping = [];
    
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        if (dateUtils.doTimesOverlap(
          events[i].startTime, 
          events[i].endTime, 
          events[j].startTime, 
          events[j].endTime
        )) {
          if (!overlapping.find(group => group.includes(events[i].id))) {
            overlapping.push([events[i].id, events[j].id]);
          } else {
            const group = overlapping.find(group => group.includes(events[i].id));
            if (!group.includes(events[j].id)) {
              group.push(events[j].id);
            }
          }
        }
      }
    }
    
    return overlapping;
  }
};
export {dateUtils};