const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('data'));

// GET /api/channels - отримати список каналів
app.get('/api/channels', (req, res) => {
  try {
    const channelsPath = path.join(__dirname, 'channels.json');
    if (fs.existsSync(channelsPath)) {
      const channels = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
      res.json(channels);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка читання каналів' });
  }
});

// POST /api/channels - додати канал
app.post('/api/channels', (req, res) => {
  try {
    const { channel } = req.body;
    if (!channel) {
      return res.status(400).json({ error: 'Канал не вказано' });
    }

    const channelsPath = path.join(__dirname, 'channels.json');
    let channels = [];
    if (fs.existsSync(channelsPath)) {
      channels = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
    }

    if (channels.length >= 20) {
      return res.status(400).json({ error: 'Максимум 20 каналів' });
    }

    if (!channels.includes(channel)) {
      channels.push(channel);
      fs.writeFileSync(channelsPath, JSON.stringify(channels, null, 2));
    }

    res.json({ success: true, channels });
  } catch (error) {
    res.status(500).json({ error: 'Помилка додавання каналу' });
  }
});

// DELETE /api/channels - видалити канал
app.delete('/api/channels/:channel', (req, res) => {
  try {
    const { channel } = req.params;
    const channelsPath = path.join(__dirname, 'channels.json');
    
    if (fs.existsSync(channelsPath)) {
      let channels = JSON.parse(fs.readFileSync(channelsPath, 'utf8'));
      channels = channels.filter(ch => ch !== channel);
      fs.writeFileSync(channelsPath, JSON.stringify(channels, null, 2));
      res.json({ success: true, channels });
    } else {
      res.json({ success: true, channels: [] });
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка видалення каналу' });
  }
});

// POST /api/fetch - запустити парсер
app.post('/api/fetch', (req, res) => {
  const pythonScript = path.join(__dirname, 'telegram_parser.py');
  const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');
  
  const pythonProcess = spawn(pythonPath, [pythonScript]);
  
  let output = '';
  let errorOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
    console.log('Python output:', data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
    console.error('Python error:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ success: true, message: 'Парсер успішно виконано', output });
    } else {
      res.status(500).json({ 
        error: 'Помилка парсера', 
        details: errorOutput || output,
        code
      });
    }
  });

  pythonProcess.on('error', (error) => {
    res.status(500).json({ 
      error: 'Помилка запуску парсера', 
      details: error.message 
    });
  });
});

// GET /api/trajectories - отримати траєкторії
app.get('/api/trajectories', (req, res) => {
  try {
    const trajectoriesPath = path.join(__dirname, 'data', 'trajectories.json');
    if (fs.existsSync(trajectoriesPath)) {
      const trajectories = JSON.parse(fs.readFileSync(trajectoriesPath, 'utf8'));
      res.json(trajectories);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка читання траєкторій' });
  }
});

// GET /api/health - перевірка стану сервера
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    python: fs.existsSync(path.join(__dirname, 'venv', 'bin', 'python3'))
  });
});

app.listen(PORT, () => {
  console.log(`API сервер запущено на порту ${PORT}`);
  console.log(`Python path: ${path.join(__dirname, 'venv', 'bin', 'python3')}`);
});