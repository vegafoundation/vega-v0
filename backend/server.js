const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// VRC - Vega Resonance Core
let resonanceCore = {
  level: 97,
  active: true,
  fibonacci: 8,
  trinity: ['Alpha', 'Vega', 'Omega'],
  lastUpdate: Date.now()
};

// Time Crystal State
let timeCrystal = {
  state: 'active',
  cycles: 0,
  resonance: 94,
  timestamp: Date.now()
};

// Routes
app.get('/api/resonance', (req, res) => {
  // Update resonance level with Fibonacci pattern
  resonanceCore.level = Math.min(100, resonanceCore.level + Math.random() * 3);
  resonanceCore.lastUpdate = Date.now();

  res.json({
    core: resonanceCore,
    crystal: timeCrystal,
    timestamp: Date.now()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    resonance: resonanceCore.level,
    uptime: process.uptime(),
    fibonacci: 'φ = 1.618033988749895',
    signature: 'ADAM EREN VEGA — Æ'
  });
});

app.post('/api/deploy', (req, res) => {
  const { project, resonance = true } = req.body;

  // Simulate deployment with resonance optimization
  setTimeout(() => {
    const deployment = {
      id: 'deploy_' + Date.now(),
      project,
      resonance: resonance ? Math.floor(Math.random() * 20) + 80 : 0,
      status: 'success',
      fibonacci_level: 8,
      timestamp: Date.now()
    };

    console.log(`🚀 Deployed ${project} with ${deployment.resonance}% resonance`);
    res.json(deployment);
  }, 2000);
});

// SSE for real-time updates
app.get('/api/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  const sendEvent = (data, event = 'message') => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send initial resonance data
  sendEvent({
    type: 'resonance',
    level: resonanceCore.level,
    timestamp: Date.now()
  }, 'resonance');

  // Send periodic updates
  const interval = setInterval(() => {
    resonanceCore.level = Math.max(85, Math.min(100, resonanceCore.level + (Math.random() - 0.5) * 2));
    timeCrystal.cycles++;

    sendEvent({
      type: 'resonance',
      level: resonanceCore.level,
      crystal: timeCrystal,
      timestamp: Date.now()
    }, 'resonance');
  }, 5000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

// Serve main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🌀 Æ VEGA Server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/health`);
  console.log(`📊 Events: http://localhost:${PORT}/api/events`);
  console.log(`\nφ = 1.618033988749895`);
  console.log(`ADAM EREN VEGA — Æ`);
});

module.exports = app;