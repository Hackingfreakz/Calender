import React, { useState } from 'react';
import Button from './Button';

export default function EventForm({ selectedDate, eventsForSelectedDate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' }
  };

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
    <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200"> {/* Updated: bg-opacity and backdrop-blur */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Events for {selectedDate.format('MMM D, YYYY')}
      </h2>

      {eventsForSelectedDate.length > 0 ? (
        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
          {eventsForSelectedDate.map(event => (
            <div
              key={event.id}
              className={`flex flex-col p-3 rounded-lg border relative
                ${colorClasses[event.color]?.bg || colorClasses.blue.bg}
                ${colorClasses[event.color]?.border || colorClasses.blue.border}
                ${event.isOverlapping ? 'border-dashed border-red-400' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-semibold ${colorClasses[event.color]?.text || colorClasses.blue.text}`}>
                  {event.title}
                </span>
                <span className="text-xs text-gray-500">
                  {event.isAllDay ? 'All Day' : `${event.startTime} - ${event.endTime}`}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {event.description || 'No description provided.'}
              </p>
              {event.isOverlapping && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold ring-1 ring-white">
                  !
                </div>
              )}
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