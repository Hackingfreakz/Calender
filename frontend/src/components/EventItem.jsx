import {dateUtils} from '../utils/dateUtils'

export default function EventItem({ event, isOverlapping = false, overlapCount = 0 }){
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
    pink: 'bg-pink-100 text-pink-800 border-pink-200'
  };
  
  const overlapIndicator = isOverlapping ? '⚠️' : '';
  const borderStyle = isOverlapping ? 'border-2 border-dashed' : 'border';
  
  return (
    <div
      className={`
        ${colorClasses[event.color] || colorClasses.blue}
        ${borderStyle}
        px-2 py-1 rounded text-xs font-medium truncate cursor-pointer
        hover:shadow-sm transition-shadow relative
      `}
      title={`${event.title} (${dateUtils.formatTime(event.startTime)} - ${dateUtils.formatTime(event.endTime)})${isOverlapping ? ' - Overlapping Event!' : ''}`}
    >
      <div className="flex items-center space-x-1">
        {overlapIndicator && <span className="text-xs">{overlapIndicator}</span>}
        <span className="truncate">{event.title}</span>
      </div>
      {!event.isAllDay && (
        <div className="text-xs opacity-75 mt-0.5">
          {dateUtils.formatTime(event.startTime)}
        </div>
      )}
      {isOverlapping && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
          !
        </div>
      )}
    </div>
  );
};
