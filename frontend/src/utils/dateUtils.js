import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const dateUtils = {
  // Generate all dates for a given month's calendar view (including prev/next month days)
  generateCalendarDates: (date) => {
    const startOfMonth = dayjs(date).startOf('month');
    const endOfMonth = dayjs(date).endOf('month');
    const startDate = dayjs(startOfMonth).startOf('week'); // Start of the week containing the 1st day
    const endDate = dayjs(endOfMonth).endOf('week');   // End of the week containing the last day

    const calendarDates = [];
    let currentDay = startDate;

    while (currentDay.isBefore(endDate) || currentDay.isSame(endDate, 'day')) {
      calendarDates.push(currentDay);
      currentDay = currentDay.add(1, 'day');
    }
    return calendarDates;
  },

  // Check if a date is today
  isToday: (date) => {
    return dayjs(date).isSame(dayjs(), 'day');
  },

  // Check if a date falls within the current month being viewed
  isCurrentMonth: (date, currentMonth) => {
    return dayjs(date).isSame(currentMonth, 'month');
  },

  // Check if two dates are the same day (ignoring time)
  isSameDay: (date1, date2) => { // <--- THIS IS THE MISSING FUNCTION!
    return dayjs(date1).isSame(dayjs(date2), 'day');
  },

  // Format time for display
  formatTime: (time) => {
    return dayjs(`2000-01-01T${time}`).format('h:mm A');
  },

  // Get events for a specific date
  getEventsForDate: (date, allEvents) => {
    return allEvents.filter(event =>
      dayjs(date).isSame(event.date, 'day')
    ).sort((a, b) => dayjs(`2000-01-01T${a.startTime}`).diff(dayjs(`2000-01-01T${b.startTime}`)));
  },

  // Detect overlapping events for a given day's events
  detectOverlappingEvents: (events) => {
    const overlappingGroups = [];
    const processedEventIds = new Set();

    events.forEach(eventA => {
      if (processedEventIds.has(eventA.id)) {
        return;
      }

      let currentGroup = [];
      // If all-day, check for overlap with other all-day events
      if (eventA.isAllDay) {
        currentGroup = events.filter(eventB =>
          eventB.isAllDay && dayjs(eventA.date).isSame(eventB.date, 'day')
        ).map(e => e.id);
      } else {
        // For timed events, check actual time overlaps
        currentGroup = events.filter(eventB => {
          if (eventB.isAllDay) return false; // Timed events don't overlap with all-day in this logic
          // Check for time overlap
          const startA = dayjs(`2000-01-01T${eventA.startTime}`);
          const endA = dayjs(`2000-01-01T${eventA.endTime}`);
          const startB = dayjs(`2000-01-01T${eventB.startTime}`);
          const endB = dayjs(`2000-01-01T${eventB.endTime}`);

          // Overlap conditions:
          // (startA is between startB and endB) OR
          // (endA is between startB and endB) OR
          // (startB is between startA and endA) OR
          // (endB is between startA and endA) OR
          // (startA is same as startB AND endA is same as endB)
          return (
            (startA.isBetween(startB, endB, null, '[)') || // [) means inclusive of start, exclusive of end
             endA.isBetween(startB, endB, null, '(]') || // () means exclusive of start, inclusive of end
             startB.isBetween(startA, endA, null, '[)') ||
             endB.isBetween(startA, endA, null, '(]') ||
             (startA.isSame(startB) && endA.isSame(endB)))
          );
        }).map(e => e.id);
      }

      if (currentGroup.length > 1) {
        overlappingGroups.push(currentGroup);
        currentGroup.forEach(id => processedEventIds.add(id));
      }
    });

    return overlappingGroups;
  }
};