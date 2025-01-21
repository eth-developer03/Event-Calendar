export interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    location?: string;
  }
  
  export const initialEvents: Event[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: '2024-03-20T10:00:00',
      end: '2024-03-20T11:00:00',
      location: 'Conference Room A',
    },
    {
      id: '2',
      title: 'Project Review',
      start: '2024-03-20T14:00:00',
      end: '2024-03-20T15:30:00',
      location: 'Virtual',
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: '2024-03-21T09:00:00',
      end: '2024-03-21T10:30:00',
      location: 'Conference Room B',
    },
    {
      id: '4',
      title: 'Team Building',
      start: '2024-03-22T13:00:00',
      end: '2024-03-22T17:00:00',
      location: 'Central Park',
    },
  ];
  