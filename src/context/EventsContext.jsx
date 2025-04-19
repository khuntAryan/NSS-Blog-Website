/* eslint-disable react/prop-types */
// src/context/EventsContext.jsx
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      imageUrl: "https://media.istockphoto.com/id/1414901355/vector/world-blood-donor-day-vector-background.jpg",
      icon: "clipboard-copy",
    },
    // ... your other initial events
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
      {children}
    </EventsContext.Provider>
  );
}