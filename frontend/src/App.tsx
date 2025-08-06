import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Filters from './components/Filters';
import ChannelsManager from './components/ChannelsManager';
import { API_ENDPOINTS } from './config';

interface Trajectory {
  source: string;
  target: string;
  time: string;
  channel?: string;
  type?: string;
  region?: string;
}

function App() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [filters, setFilters] = useState({ type: '', region: '' });
  const [data, setData] = useState<Trajectory[]>([]);

  // Polling для trajectories через API
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchData = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.TRAJECTORIES);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Помилка завантаження траєкторій:', error);
        setData([]);
      }
    };
    fetchData();
    interval = setInterval(fetchData, 30000); // кожні 30 секунд
    return () => clearInterval(interval);
  }, []);

  // Фільтрація
  const filteredData = data.filter(item => {
    return (
      (!selectedChannel || item.channel === selectedChannel) &&
      (filters.type === '' || item.type === filters.type) &&
      (filters.region === '' || item.region === filters.region)
    );
  });

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Карта тривог та траєкторій</h2>
      <ChannelsManager onChannelSelect={setSelectedChannel} />
      <Filters onFilterChange={setFilters} />
      <Map data={filteredData} />
    </div>
  );
}

export default App;
