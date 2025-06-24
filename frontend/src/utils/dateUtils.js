import dayjs from 'dayjs';
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
  
  // Generate array of dates for calendar grid
  generateCalendarDates: (date) => {
    const startDate = dateUtils.getCalendarStartDate(date);
    const endDate = dateUtils.getCalendarEndDate(date);
    const dates = [];
    let currentDate = startDate;
    
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, 'day');
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
  }
};
export {dateUtils}; 