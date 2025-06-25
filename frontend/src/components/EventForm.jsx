import React, { useState } from 'react';
import Button from './Button';

export default function EventForm({ selectedDate, eventsForSelectedDate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleAddEvent = (e) => {
    e.preventDefault();
    // This is a dummy function as we don't have a backend
    console.log('--- Dummy Add Event ---');
    console.log('Selected Date:', selectedDate.format('YYYY-MM-DD'));
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('--- Event Added (Dummy) ---');

    // Clear form fields after "adding"
    setTitle('');
    setDescription('');
    setStartTime('09:00');
    setEndTime('10:00');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Events for {selectedDate.format('MMM D, YYYY')}
      </h2>

      {eventsForSelectedDate.length > 0 ? (
        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
          {eventsForSelectedDate.map(event => (
            <div
              key={event.id}
              className={`
                flex flex-col p-3 rounded-lg border
                ${event.isOverlapping ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-semibold ${event.isOverlapping ? 'text-red-700' : 'text-gray-800'}`}>
                  {event.title} {event.isOverlapping && <span className="ml-1 text-red-500">⚠️</span>}
                </span>
                <span className="text-xs text-gray-500">
                  {event.isAllDay ? 'All Day' : `${event.startTime} - ${event.endTime}`}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {event.description || 'No description provided.'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-6">No events scheduled for this day.</p>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Event (Dummy)</h3>
      <form onSubmit={handleAddEvent} className="space-y-4">
        <div>
          <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="eventTitle"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="eventDescription"
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Add Event (Dummy)
        </Button>
      </form>
    </div>
  );
}