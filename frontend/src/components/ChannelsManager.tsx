import React, { useState, useEffect } from 'react';

type ChannelsManagerProps = {
  onChannelSelect: (channel: string | null) => void;
};

const ChannelsManager: React.FC<ChannelsManagerProps> = ({ onChannelSelect }) => {
  const [input, setInput] = useState('');
  const [channels, setChannels] = useState<string[]>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Завантаження списку каналів з API
  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/channels');
      const data = await response.json();
      setChannels(data);
      if (data.length > 0 && !activeChannel) {
        setActiveChannel(data[0]);
        onChannelSelect(data[0]);
      }
    } catch (error) {
      console.error('Помилка завантаження каналів:', error);
    }
  };

  const addChannel = async () => {
    if (!input.trim()) return;
    if (channels.length >= 20) {
      alert('Максимум 20 каналів');
      return;
    }

    let username = input.trim();
    if (username.startsWith('https://t.me/')) {
      username = username.replace('https://t.me/', '');
    } else if (username.startsWith('@')) {
      username = username.slice(1);
    }

    if (!channels.includes(username)) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/api/channels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channel: username }),
        });
        const data = await response.json();
        if (data.success) {
          setChannels(data.channels);
          setActiveChannel(username);
          onChannelSelect(username);
          // Автоматично запускаємо парсер після додавання каналу
          await fetch('http://localhost:3001/api/fetch', { method: 'POST' });
        } else {
          alert(data.error || 'Помилка додавання каналу');
        }
      } catch (error) {
        alert('Помилка додавання каналу');
      } finally {
        setLoading(false);
      }
    }
    setInput('');
  };

  const removeChannel = async (usernameToRemove: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/channels/${usernameToRemove}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setChannels(data.channels);
        if (activeChannel === usernameToRemove) {
          const nextActive = data.channels[0] || null;
          setActiveChannel(nextActive);
          onChannelSelect(nextActive);
        }
        // Автоматично запускаємо парсер після видалення каналу
        await fetch('http://localhost:3001/api/fetch', { method: 'POST' });
      }
    } catch (error) {
      alert('Помилка видалення каналу');
    } finally {
      setLoading(false);
    }
  };

  const selectChannel = (username: string) => {
    setActiveChannel(username);
    onChannelSelect(username);
  };

  return (
    <div style={{ maxWidth: 400, margin: '1em auto' }}>
      <input
        type="text"
        placeholder="Введи посилання або @username каналу"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '70%' }}
        disabled={loading}
      />
      <button onClick={addChannel} style={{ marginLeft: 8 }} disabled={loading}>
        {loading ? 'Додавання...' : 'Додати'}
      </button>
      <div style={{ marginTop: 16 }}>
        <b>Канали (макс 20):</b>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {channels.map(ch => (
            <li key={ch} style={{ marginBottom: 6 }}>
              <button
                style={{
                  backgroundColor: ch === activeChannel ? '#4caf50' : '#eee',
                  border: 'none',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  marginRight: 8,
                }}
                onClick={() => selectChannel(ch)}
                disabled={loading}
              >
                @{ch}
              </button>
              <button
                onClick={() => removeChannel(ch)}
                style={{
                  color: 'red',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                }}
                title="Видалити канал"
                disabled={loading}
              >
                ❌
              </button>
            </li>
          ))}
          {channels.length === 0 && <li>Канали не додані</li>}
        </ul>
      </div>
    </div>
  );
};

export default ChannelsManager;