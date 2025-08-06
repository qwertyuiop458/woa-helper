import React, { useState } from 'react';

type ChannelsManagerProps = {
  onChannelSelect: (channel: string | null) => void;
};

const ChannelsManager: React.FC<ChannelsManagerProps> = ({ onChannelSelect }) => {
  const [input, setInput] = useState('');
  const [channels, setChannels] = useState<string[]>([]);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  const addChannel = () => {
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
      const newChannels = [...channels, username];
      setChannels(newChannels);
      setActiveChannel(username);
      onChannelSelect(username);
    }
    setInput('');
  };

  const removeChannel = (usernameToRemove: string) => {
    const newChannels = channels.filter(ch => ch !== usernameToRemove);
    setChannels(newChannels);
    if (activeChannel === usernameToRemove) {
      const nextActive = newChannels[0] || null;
      setActiveChannel(nextActive);
      onChannelSelect(nextActive);
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
      />
      <button onClick={addChannel} style={{ marginLeft: 8 }}>Додати</button>
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