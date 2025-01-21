
import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  X,
  PlusCircle,
  Edit,
  Trash,
  Save,
} from 'lucide-react';

import { initialEvents, Event } from '../../events';

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const locations = useMemo(() => {
    const uniqueLocations = new Set(events.map((event) => event.location));
    return Array.from(uniqueLocations).filter(Boolean) as string[];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesDate = !selectedDate || event.start.includes(selectedDate);
      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;
      const matchesSearch =
        !searchQuery ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location &&
          event.location.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDate && matchesLocation && matchesSearch;
    });
  }, [events, selectedDate, selectedLocation, searchQuery]);

  const clearFilters = () => {
    setSelectedDate('');
    setSelectedLocation('');
    setSearchQuery('');
  };

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: 'New Event',
      start: new Date().toISOString(),
      end: new Date(new Date().getTime() + 3600000).toISOString(),
      location: 'New Location',
    };
    setEvents([...events, newEvent]);
  };

  const handleEditEvent = (event: Event) => {
    setIsEditing(true);
    setCurrentEvent(event);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleSaveEvent = () => {
    if (currentEvent) {
      setEvents(
        events.map((event) =>
          event.id === currentEvent.id ? currentEvent : event
        )
      );
    }
    setIsEditing(false);
    setCurrentEvent(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">My Calendar</h1>
            </div>
            {!isEditing && (
              <button
                onClick={handleAddEvent}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-500"
              >
                <PlusCircle className="w-4 h-4" />
                Add Event
              </button>
            )}
          </div>

          {/* Edit Form */}
          {isEditing && currentEvent && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Edit Event</h2>
              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={currentEvent.title}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="datetime-local"
                  value={currentEvent.start.slice(0, 16)}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, start: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="datetime-local"
                  value={currentEvent.end.slice(0, 16)}
                  onChange={(e) =>
                    setCurrentEvent({ ...currentEvent, end: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={currentEvent.location || ''}
                  onChange={(e) =>
                    setCurrentEvent({
                      ...currentEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveEvent}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          {!isEditing && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-4"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          )}
          {!isEditing && showFilters && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search events or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                {/* Date */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[200px]"
                />
                {/* Location */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none min-w-[200px]"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                {/* Clear */}
                {(selectedDate || selectedLocation || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Events Table */}
          {!isEditing && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{event.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(event.start).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-500 mr-2"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

