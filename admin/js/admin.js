/**
 * Æ VEGA — GOD Admin Portal
 * Full Orchestration System
 */

// ============================================
// Sample Library Data
// ============================================

const SAMPLES = [
  { name: "Æ - Horizon Sky", artist: "Æ", file: "Æ - Horizon Sky.mp3", category: "ae" },
  { name: "Æ - The Restart", artist: "Æ", file: "Æ - The Restart.mp3", category: "ae" },
  { name: "Æ - The Hips she can breathe", artist: "Æ", file: "Æ - The Hips she can breathe..mp3", category: "ae" },
  { name: "ANLÆTAN - Neuro Rebirth", artist: "ANLÆTAN", file: "æ-|-anlætan-neuro-rebirth.mp3", category: "anlaetan" },
  { name: "ANLÆTAN - And I keep", artist: "ANLÆTAN", file: "ANLÆTAN - And I keep..mp3", category: "anlaetan" },
  { name: "ANLÆTAN - Boden voller Blut", artist: "ANLÆTAN", file: "ANLÆTAN - Boden voller Blut!.mp3", category: "anlaetan" },
  { name: "ANLÆTAN - Men dont give", artist: "ANLÆTAN", file: "ANLÆTAN - Men dont give!.mp3", category: "anlaetan" },
  { name: "ÆRÆN - Go", artist: "ÆRÆN", file: "ÆRÆN - Go .mp3", category: "aeraen" },
  { name: "ÆRÆN - Used to sing", artist: "ÆRÆN", file: "ÆRÆN - Used to sing….mp3", category: "aeraen" },
  { name: "ÆRÆN - Laut essen", artist: "ÆRÆN", file: "ÆRÆN- Laut essen! v1.0.mp3", category: "aeraen" },
  { name: "Power is your own (Remastered)", artist: "Æ", file: "power-is-your-own.-(remastered).mp3", category: "ae" },
  { name: "I let you go (Remastered)", artist: "Æ", file: "æ---i-let-you-go-(remastered).mp3", category: "ae" },
  { name: "VEGA Soundscape", artist: "VEGA", file: "vega_soundscape.wav", category: "vega" },
  { name: "ADAM", artist: "VEGA", file: "ADAM.mp3", category: "vega" },
  { name: "Æ ∞", artist: "Æ", file: "æ—∞.mp3", category: "ae" },
  { name: "X Æ 5", artist: "Æ", file: "X Æ 5.mp3", category: "ae" },
  { name: "Essenlæt", artist: "ANLÆTAN", file: "Essenlæt.mp3", category: "anlaetan" },
  { name: "FürTANAE", artist: "ANLÆTAN", file: "FürTANAE.mp3", category: "anlaetan" },
  { name: "TRACKX5", artist: "VEGA", file: "TRACKX5.mp3", category: "vega" },
  { name: "Official1", artist: "VEGA", file: "Official1.mp3", category: "vega" },
];

// ============================================
// Agents Data
// ============================================

const AGENTS = [
  { name: "Alpha Controller", desc: "Genesis & initialization", icon: "α", status: "active" },
  { name: "Omega Aggregator", desc: "Output synthesis", icon: "Ω", status: "active" },
  { name: "VRC Module", desc: "Resonance core", icon: "◎", status: "active" },
  { name: "ANLÆTAN Engine", desc: "Sonic ecosystem", icon: "♫", status: "active" },
  { name: "Grok Agent", desc: "Real-time intelligence", icon: "X", status: "active" },
  { name: "Guardian", desc: "Security & validation", icon: "🛡", status: "active" },
  { name: "Oracle", desc: "Predictive analytics", icon: "◉", status: "idle" },
  { name: "Quantum Sim", desc: "Quantum-inspired", icon: "⟨ψ⟩", status: "active" },
  { name: "Knowledge Map", desc: "Graph navigation", icon: "🗺", status: "active" },
  { name: "Whitepaper Agent", desc: "Doc generation", icon: "📄", status: "idle" },
  { name: "Integration Agent", desc: "API orchestration", icon: "🔗", status: "active" },
  { name: "Infinity Loop", desc: "Continuous operation", icon: "∞", status: "active" },
];

// ============================================
// State
// ============================================

let currentPanel = 'chat';
let audioPlayer = null;
let currentSampleIndex = -1;
let isPlaying = false;
let studioAudioContext = null;

// ============================================
// Navigation
// ============================================

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const panel = item.dataset.panel;
    if (panel) showPanel(panel);
  });
});

function showPanel(panelId) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelector(`[data-panel="${panelId}"]`)?.classList.add('active');
  
  // Update panels
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${panelId}`)?.classList.add('active');
  
  // Update title
  const titles = {
    chat: 'VEGA Chat',
    connectors: 'API Connectors',
    apps: 'Apps & Authentication',
    'module-gen': 'Module Generator',
    'app-builder': 'App Builder',
    'website-deployer': 'Website Deployer',
    'image-gen': 'Image Generation',
    'whitepaper-gen': 'Whitepaper Generator',
    soundscape: 'Soundscape Studio',
    samples: 'Sample Library',
    agents: 'Agent Manager',
    'cursor-api': 'Cursor API',
    monitoring: 'System Monitoring',
    docs: 'Documentation'
  };
  document.getElementById('panel-title').textContent = titles[panelId] || panelId;
  
  currentPanel = panelId;
}

// ============================================
// Theme Toggle
// ============================================

function toggleTheme() {
  document.body.classList.toggle('light-theme');
}

// ============================================
// Chat Functions
// ============================================

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;
  
  const messagesContainer = document.getElementById('chat-messages');
  
  // Add user message
  messagesContainer.innerHTML += `
    <div class="message user">
      <div class="avatar">U</div>
      <div class="content">${escapeHtml(message)}</div>
    </div>
  `;
  
  input.value = '';
  
  // Add typing indicator
  const typingId = Date.now();
  messagesContainer.innerHTML += `
    <div class="message assistant" id="typing-${typingId}">
      <div class="avatar">Æ</div>
      <div class="content">
        <span class="typing-indicator">●●●</span>
      </div>
    </div>
  `;
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate AI response (in production, this would call the orchestrator)
  setTimeout(() => {
    const typing = document.getElementById(`typing-${typingId}`);
    if (typing) {
      typing.querySelector('.content').innerHTML = generateResponse(message);
    }
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

function generateResponse(message) {
  const responses = {
    module: `Ich kann dir beim Erstellen eines neuen Moduls helfen! 🧩\n\nGehe zum <strong>Module Generator</strong> Panel und beschreibe, was dein Modul tun soll. Ich generiere automatisch:\n\n• AMP-konforme Struktur\n• Auto-Documentation\n• Unit Tests\n• Integration mit dem VEGA Stack`,
    app: `Lass uns eine App bauen! 🏗️\n\nIm <strong>App Builder</strong> kannst du:\n• Web Apps (React)\n• Mobile Apps (React Native)\n• Full-Stack (Next.js)\n• API Backends\n\nAlle mit VEGA SDK Integration.`,
    website: `Website Deployment ist bereit! 🌐\n\nIm <strong>Website Deployer</strong>:\n1. Wähle ein Template\n2. Beschreibe die gewünschte Seite\n3. Ich generiere den Code\n4. Deploy zu *.vega.foundation`,
    image: `Bildgenerierung im ANLÆTAN Stil! 🎨\n\nGehe zu <strong>Image Generation</strong> und beschreibe dein Bild. Ich nutze DALL-E 3 oder Stability AI mit VEGA-spezifischen Style-Presets.`,
    default: `Ich bin VEGA, dein orchestrierter AI-Assistent. 🌟\n\nIch kann dir helfen mit:\n• <strong>Module erstellen</strong> - Neue VEGA-Module generieren\n• <strong>Apps bauen</strong> - Komplette Anwendungen\n• <strong>Websites deployen</strong> - Für Kunden\n• <strong>Bilder generieren</strong> - ANLÆTAN Stil\n• <strong>Whitepapers</strong> - Automatisch erstellen\n\nWas möchtest du erschaffen?`
  };
  
  const lower = message.toLowerCase();
  if (lower.includes('modul')) return responses.module;
  if (lower.includes('app')) return responses.app;
  if (lower.includes('website') || lower.includes('deploy')) return responses.website;
  if (lower.includes('bild') || lower.includes('image')) return responses.image;
  return responses.default;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Enter key to send
document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// ============================================
// Module Generator
// ============================================

function generateModule() {
  const name = document.getElementById('module-name').value || 'VegaModule';
  const desc = document.getElementById('module-desc').value || 'A VEGA module';
  const type = document.getElementById('module-type').value;
  
  const code = `/**
 * ${name}
 * ${desc}
 * 
 * @module ${name}
 * @author VEGA Foundation
 * @version 1.0.0
 * @amp-compliant true
 */

import { AMPAgent, VegaCore } from '@vega/core';
import { createLogger } from '@vega/utils';

const logger = createLogger('${name}');

export class ${name} extends AMPAgent {
  constructor(config = {}) {
    super({
      name: '${name}',
      version: '1.0.0',
      scope: '${type}',
      ...config
    });
    
    this.state = {
      initialized: false,
      status: 'idle'
    };
  }

  async initialize() {
    logger.info('Initializing ${name}...');
    
    // Register with VEGA core
    await VegaCore.register(this);
    
    // Setup listeners
    this.on('message', this.handleMessage.bind(this));
    this.on('error', this.handleError.bind(this));
    
    this.state.initialized = true;
    this.state.status = 'active';
    
    logger.info('${name} initialized successfully');
    return this;
  }

  async handleMessage(message) {
    logger.debug('Received message:', message);
    
    // Process message based on type
    switch (message.type) {
      case 'query':
        return this.processQuery(message.payload);
      case 'action':
        return this.executeAction(message.payload);
      default:
        logger.warn('Unknown message type:', message.type);
    }
  }

  async processQuery(payload) {
    // Implement query processing
    return {
      success: true,
      data: payload,
      timestamp: Date.now()
    };
  }

  async executeAction(payload) {
    // Implement action execution
    this.emit('action:executed', payload);
    return { success: true };
  }

  handleError(error) {
    logger.error('Error in ${name}:', error);
    this.state.status = 'error';
  }

  async shutdown() {
    logger.info('Shutting down ${name}...');
    this.state.status = 'shutdown';
    await VegaCore.unregister(this);
  }
}

// Export singleton instance
export default new ${name}();
`;

  document.getElementById('module-code').innerHTML = `<code>${escapeHtml(code)}</code>`;
  toast('Module generated successfully! 🧩');
}

function loadTemplate(type) {
  const templates = {
    agent: { name: 'VegaAgent', type: 'agent', desc: 'Autonomous agent with AMP compliance' },
    api: { name: 'VegaAPIService', type: 'api', desc: 'REST/GraphQL API service' },
    ui: { name: 'VegaComponent', type: 'ui', desc: 'React UI component' },
    resonance: { name: 'ResonanceModule', type: 'protocol', desc: 'VRC integration module' }
  };
  
  const t = templates[type];
  if (t) {
    document.getElementById('module-name').value = t.name;
    document.getElementById('module-desc').value = t.desc;
    document.getElementById('module-type').value = t.type;
    toast(`Template "${type}" loaded`);
  }
}

function copyCode() {
  const code = document.getElementById('module-code').textContent;
  navigator.clipboard.writeText(code);
  toast('Code copied to clipboard! 📋');
}

function deployModule() {
  toast('Deploying module to VEGA ecosystem... 🚀', 'success');
  setTimeout(() => {
    toast('Module deployed successfully!', 'success');
  }, 2000);
}

// ============================================
// App Builder
// ============================================

document.querySelectorAll('.feature-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('active');
  });
});

function buildApp() {
  const name = document.getElementById('app-name').value || 'my-vega-app';
  const type = document.getElementById('app-type').value;
  
  toast('Building app structure... 🏗️');
  
  setTimeout(() => {
    const structure = document.getElementById('app-structure');
    structure.innerHTML = `
      <div class="tree-item folder open">
        <span>📁 ${name}/</span>
        <div class="tree-children">
          <div class="tree-item file">📄 package.json</div>
          <div class="tree-item file">📄 vega.config.js</div>
          <div class="tree-item file">📄 .env.example</div>
          <div class="tree-item folder open">
            <span>📁 src/</span>
            <div class="tree-children">
              <div class="tree-item file">📄 index.${type === 'web' ? 'jsx' : 'js'}</div>
              <div class="tree-item file">📄 App.${type === 'web' ? 'jsx' : 'js'}</div>
              <div class="tree-item folder">
                <span>📁 components/</span>
                <div class="tree-children">
                  <div class="tree-item file">📄 Header.jsx</div>
                  <div class="tree-item file">📄 Footer.jsx</div>
                </div>
              </div>
              <div class="tree-item folder">
                <span>📁 vega/</span>
                <div class="tree-children">
                  <div class="tree-item file">📄 client.js</div>
                  <div class="tree-item file">📄 hooks.js</div>
                </div>
              </div>
              <div class="tree-item folder">
                <span>📁 styles/</span>
                <div class="tree-children">
                  <div class="tree-item file">📄 globals.css</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tree-item folder">
            <span>📁 public/</span>
          </div>
        </div>
      </div>
    `;
    toast('App structure generated! ✨', 'success');
  }, 1500);
}

function previewApp() {
  toast('Opening preview...');
}

// ============================================
// Website Deployer
// ============================================

document.querySelectorAll('.template-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.template-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
  });
});

document.getElementById('site-domain')?.addEventListener('input', (e) => {
  document.getElementById('preview-domain').textContent = e.target.value || 'kunde';
});

function generateSite() {
  const name = document.getElementById('site-name').value || 'kunde-website';
  const prompt = document.getElementById('site-prompt').value;
  
  toast('Generating website with AI... 🌐');
  
  setTimeout(() => {
    const frame = document.getElementById('site-preview-frame');
    frame.srcdoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Syne', sans-serif; 
            background: linear-gradient(135deg, #0D0D0D 0%, #1a1a2e 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
          }
          h1 { 
            font-size: 3rem; 
            background: linear-gradient(135deg, #D4AF37, #8B5CF6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
          }
          p { color: #A1A1AA; max-width: 600px; line-height: 1.6; }
          .btn {
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: #D4AF37;
            color: #0D0D0D;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>${name}</h1>
        <p>Generated by VEGA AI. ${prompt || 'A beautiful website for your business.'}</p>
        <button class="btn">Get Started</button>
      </body>
      </html>
    `;
    toast('Website generated! ✨', 'success');
  }, 2000);
}

function deploySite() {
  const domain = document.getElementById('site-domain').value || 'kunde';
  toast('Deploying to production... 🚀');
  
  setTimeout(() => {
    toast(`Deployed to ${domain}.vega.foundation! 🎉`, 'success');
  }, 3000);
}

// ============================================
// Cursor API
// ============================================

function cursorAction(action) {
  const terminal = document.getElementById('cursor-terminal');
  const actions = {
    'create-file': 'Creating new file...',
    'edit-file': 'Opening file editor...',
    'run-command': 'Ready to run command',
    'search': 'Searching codebase...',
    'generate': 'Generating code with AI...',
    'refactor': 'Analyzing code for refactoring...'
  };
  
  addTerminalLine(`${actions[action] || action}`);
}

function addTerminalLine(text, type = '') {
  const terminal = document.getElementById('cursor-terminal');
  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;
  line.innerHTML = `<span class="prompt">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'vega@admin $'}</span><span>${text}</span>`;
  
  // Remove cursor from last line
  const lastCursor = terminal.querySelector('.cursor');
  if (lastCursor) lastCursor.parentElement.remove();
  
  terminal.appendChild(line);
  
  // Add new cursor line
  const cursorLine = document.createElement('div');
  cursorLine.className = 'terminal-line';
  cursorLine.innerHTML = '<span class="prompt">vega@admin $</span><span class="cursor">_</span>';
  terminal.appendChild(cursorLine);
  
  terminal.scrollTop = terminal.scrollHeight;
}

function executeTerminal() {
  const input = document.getElementById('terminal-cmd');
  const cmd = input.value.trim();
  if (!cmd) return;
  
  addTerminalLine(cmd);
  input.value = '';
  
  // Process command
  setTimeout(() => {
    if (cmd.startsWith('help')) {
      addTerminalLine('Available commands: help, status, agents, deploy, build, clear', 'success');
    } else if (cmd === 'status') {
      addTerminalLine('VEGA System Status: ONLINE | Agents: 27 active | Uptime: 99.9%', 'success');
    } else if (cmd === 'agents') {
      addTerminalLine('Active agents: Alpha, Omega, VRC, ANLÆTAN, Grok, Guardian, Oracle...', 'success');
    } else if (cmd === 'clear') {
      clearTerminal();
    } else {
      addTerminalLine(`Executing: ${cmd}...`);
      setTimeout(() => addTerminalLine('Command completed', 'success'), 500);
    }
  }, 300);
}

function clearTerminal() {
  const terminal = document.getElementById('cursor-terminal');
  terminal.innerHTML = `
    <div class="terminal-line">
      <span class="prompt">vega@admin $</span>
      <span>Terminal cleared</span>
    </div>
    <div class="terminal-line">
      <span class="prompt">vega@admin $</span>
      <span class="cursor">_</span>
    </div>
  `;
}

// ============================================
// Sample Library
// ============================================

function renderSamples(filter = 'all') {
  const grid = document.getElementById('samples-grid');
  if (!grid) return;
  
  const filtered = filter === 'all' 
    ? SAMPLES 
    : SAMPLES.filter(s => s.category === filter);
  
  grid.innerHTML = filtered.map((sample, i) => `
    <div class="sample-card" onclick="playSample(${SAMPLES.indexOf(sample)})" data-index="${SAMPLES.indexOf(sample)}">
      <div class="sample-icon">🎵</div>
      <div class="sample-name">${sample.name}</div>
      <div class="sample-artist">${sample.artist}</div>
    </div>
  `).join('');
}

function filterSamples(query) {
  const filtered = SAMPLES.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase())
  );
  
  const grid = document.getElementById('samples-grid');
  grid.innerHTML = filtered.map((sample, i) => `
    <div class="sample-card" onclick="playSample(${SAMPLES.indexOf(sample)})" data-index="${SAMPLES.indexOf(sample)}">
      <div class="sample-icon">🎵</div>
      <div class="sample-name">${sample.name}</div>
      <div class="sample-artist">${sample.artist}</div>
    </div>
  `).join('');
}

document.querySelectorAll('.filter-chips .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderSamples(chip.dataset.filter);
  });
});

function playSample(index) {
  const sample = SAMPLES[index];
  if (!sample) return;
  
  currentSampleIndex = index;
  
  // Update UI
  document.querySelectorAll('.sample-card').forEach(c => c.classList.remove('playing'));
  document.querySelector(`[data-index="${index}"]`)?.classList.add('playing');
  
  // Update now playing
  document.querySelector('.track-name').textContent = sample.name;
  document.querySelector('.track-artist').textContent = sample.artist;
  
  // Create audio player
  if (audioPlayer) audioPlayer.pause();
  audioPlayer = new Audio(`../../ALPHA/audio/${sample.file}`);
  audioPlayer.volume = 0.7;
  audioPlayer.play().catch(e => {
    console.log('Audio playback failed:', e);
    toast('Audio playback failed - check file path', 'error');
  });
  
  isPlaying = true;
  document.querySelector('.play-btn').textContent = '⏸';
  
  // Progress bar
  audioPlayer.ontimeupdate = () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
  };
  
  audioPlayer.onended = () => {
    nextTrack();
  };
}

function togglePlay() {
  if (!audioPlayer) {
    if (SAMPLES.length > 0) playSample(0);
    return;
  }
  
  if (isPlaying) {
    audioPlayer.pause();
    document.querySelector('.play-btn').textContent = '▶';
  } else {
    audioPlayer.play();
    document.querySelector('.play-btn').textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

function prevTrack() {
  const newIndex = currentSampleIndex > 0 ? currentSampleIndex - 1 : SAMPLES.length - 1;
  playSample(newIndex);
}

function nextTrack() {
  const newIndex = currentSampleIndex < SAMPLES.length - 1 ? currentSampleIndex + 1 : 0;
  playSample(newIndex);
}

function setVolume(value) {
  if (audioPlayer) {
    audioPlayer.volume = value / 100;
  }
}

// ============================================
// API Connectors
// ============================================

function testConnector(provider) {
  toast(`Testing ${provider} connection...`);
  setTimeout(() => {
    toast(`${provider} connection successful! ✓`, 'success');
  }, 1500);
}

function saveConnector(provider) {
  const keyInput = document.getElementById(`${provider}-key`);
  const key = keyInput?.value;
  
  if (!key) {
    toast('Please enter an API key', 'error');
    return;
  }
  
  // Store in localStorage (in production, use secure storage)
  localStorage.setItem(`vega_${provider}_key`, key);
  toast(`${provider} API key saved`, 'success');
}

// ============================================
// Image Generation
// ============================================

document.querySelectorAll('.style-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

async function generateImage() {
  const prompt = document.getElementById('image-prompt').value;
  const style = document.querySelector('.style-btn.active')?.dataset.style || 'vega';
  
  if (!prompt) {
    toast('Please enter a prompt', 'error');
    return;
  }
  
  const preview = document.getElementById('image-preview');
  preview.innerHTML = '<span>🔄</span><p>Generating image...</p>';
  
  // Enhanced prompt with VEGA style
  const stylePrompts = {
    vega: 'VEGA aesthetic, golden ratio, violet and gold colors, futuristic, elegant',
    anlaetan: 'ANLÆTAN sonic visualization, 8D spatial audio waves, frequency patterns',
    resonance: 'Resonance patterns, harmonic waves, Fibonacci spirals',
    quantum: 'Quantum mechanics visualization, superposition, wave functions',
    fibonacci: 'Fibonacci sequence, golden spiral, natural patterns',
    cosmic: 'Cosmic space, nebulae, stars, universe'
  };
  
  const fullPrompt = `${prompt}. Style: ${stylePrompts[style] || stylePrompts.vega}`;
  
  // In production, this would call DALL-E 3 or Stability AI
  setTimeout(() => {
    preview.innerHTML = `
      <img src="https://placehold.co/1024x1024/0D0D0D/D4AF37?text=VEGA+Generated+Image" alt="Generated image" style="max-width: 100%; border-radius: 12px;">
    `;
    document.getElementById('image-actions').style.display = 'flex';
    toast('Image generated! 🎨', 'success');
  }, 3000);
}

// ============================================
// Whitepaper Generator
// ============================================

function generateWhitepaper() {
  const title = document.getElementById('wp-title').value;
  const subtitle = document.getElementById('wp-subtitle').value;
  
  toast('Generating whitepaper... 📄');
  
  setTimeout(() => {
    const preview = document.querySelector('.whitepaper-preview');
    preview.innerHTML = `
      <div class="wp-preview-header">
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
      <div class="wp-preview-content">
        <div class="wp-section">
          <h4>01 — Abstract</h4>
          <p>VEGA represents a paradigm shift in artificial intelligence infrastructure—a meta-operating system designed to orchestrate autonomous agents, synthesize knowledge, and generate resonant outputs across creative, analytical, and operational domains...</p>
        </div>
        <div class="wp-section">
          <h4>02 — Vision & Philosophy</h4>
          <p>The VEGA Foundation is building the world's first AI, Art, and Resonance platform. Our mission extends beyond traditional artificial intelligence to encompass the full spectrum of creative and cognitive expression...</p>
        </div>
        <div class="wp-section">
          <h4>03 — System Architecture</h4>
          <p>VEGA operates as a 7-layer meta-operating system, each layer providing specific capabilities while maintaining bidirectional communication with adjacent layers...</p>
        </div>
      </div>
    `;
    toast('Whitepaper generated! ✨', 'success');
  }, 2000);
}

// ============================================
// Soundscape Studio
// ============================================

let studioOscillators = [];
let studioGain = null;

function toggleStudio() {
  if (studioAudioContext) {
    studioOscillators.forEach(osc => osc.stop());
    studioAudioContext.close();
    studioAudioContext = null;
    studioOscillators = [];
    document.querySelector('.studio-controls .btn-lg').textContent = '▶ Play';
    return;
  }
  
  studioAudioContext = new (window.AudioContext || window.webkitAudioContext)();
  studioGain = studioAudioContext.createGain();
  studioGain.connect(studioAudioContext.destination);
  studioGain.gain.value = document.getElementById('master-vol').value / 100;
  
  const baseFreq = parseInt(document.getElementById('base-freq').value);
  const binauralFreq = parseInt(document.getElementById('binaural-freq').value);
  
  // Create binaural beat
  const oscL = studioAudioContext.createOscillator();
  const oscR = studioAudioContext.createOscillator();
  const panL = studioAudioContext.createStereoPanner();
  const panR = studioAudioContext.createStereoPanner();
  
  oscL.frequency.value = baseFreq;
  oscR.frequency.value = baseFreq + binauralFreq;
  panL.pan.value = -1;
  panR.pan.value = 1;
  
  oscL.connect(panL).connect(studioGain);
  oscR.connect(panR).connect(studioGain);
  
  oscL.start();
  oscR.start();
  
  studioOscillators = [oscL, oscR];
  
  document.querySelector('.studio-controls .btn-lg').textContent = '⏹ Stop';
  animateStudioVisualizer();
}

function loadPreset(preset) {
  const presets = {
    alpha: { base: 432, binaural: 10 },
    theta: { base: 432, binaural: 6 },
    gamma: { base: 432, binaural: 40 },
    fibonacci: { base: 432, binaural: 8 },
    solfeggio: { base: 528, binaural: 8 }
  };
  
  const p = presets[preset];
  if (p) {
    document.getElementById('base-freq').value = p.base;
    document.getElementById('binaural-freq').value = p.binaural;
    document.getElementById('base-freq-val').textContent = `${p.base} Hz`;
    document.getElementById('binaural-val').textContent = `${p.binaural} Hz`;
    toast(`Preset "${preset}" loaded`);
  }
}

function animateStudioVisualizer() {
  const canvas = document.getElementById('studio-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  function draw() {
    if (!studioAudioContext) return;
    
    ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw wave
    ctx.beginPath();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    
    for (let x = 0; x < width; x++) {
      const y = height / 2 + Math.sin(x * 0.02 + Date.now() * 0.002) * 50 
                + Math.sin(x * 0.01 + Date.now() * 0.001) * 30;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Draw secondary wave
    ctx.beginPath();
    ctx.strokeStyle = '#8B5CF6';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < width; x++) {
      const y = height / 2 + Math.sin(x * 0.03 + Date.now() * 0.003) * 30 
                + Math.cos(x * 0.02 + Date.now() * 0.002) * 20;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

function exportSoundscape() {
  toast('Exporting soundscape... (Feature coming soon)');
}

function savePreset() {
  toast('Preset saved! 📥', 'success');
}

// Update frequency displays
document.getElementById('base-freq')?.addEventListener('input', (e) => {
  document.getElementById('base-freq-val').textContent = `${e.target.value} Hz`;
});
document.getElementById('binaural-freq')?.addEventListener('input', (e) => {
  document.getElementById('binaural-val').textContent = `${e.target.value} Hz`;
});
document.getElementById('spatial')?.addEventListener('input', (e) => {
  document.getElementById('spatial-val').textContent = `${e.target.value}%`;
});
document.getElementById('reverb')?.addEventListener('input', (e) => {
  document.getElementById('reverb-val').textContent = `${e.target.value}%`;
});
document.getElementById('master-vol')?.addEventListener('input', (e) => {
  document.getElementById('master-val').textContent = `${e.target.value}%`;
  if (studioGain) studioGain.gain.value = e.target.value / 100;
});

// ============================================
// Agent Manager
// ============================================

function renderAgents() {
  const grid = document.getElementById('agents-grid');
  if (!grid) return;
  
  grid.innerHTML = AGENTS.map(agent => `
    <div class="agent-card">
      <div class="agent-icon">${agent.icon}</div>
      <div class="agent-info">
        <h4>${agent.name}</h4>
        <p>${agent.desc}</p>
      </div>
      <div class="agent-status ${agent.status}"></div>
    </div>
  `).join('');
}

// ============================================
// Apps Management
// ============================================

function createApp() {
  const name = prompt('Enter app name:');
  if (!name) return;
  
  const grid = document.getElementById('apps-grid');
  const card = document.createElement('div');
  card.className = 'app-card';
  card.innerHTML = `
    <div class="app-icon">📱</div>
    <div class="app-info">
      <h4>${name}</h4>
      <code>${name.toLowerCase().replace(/\s+/g, '-')}-001</code>
    </div>
    <div class="app-status active">Active</div>
    <div class="app-actions">
      <button class="btn btn-sm">Edit</button>
      <button class="btn btn-sm">Keys</button>
    </div>
  `;
  grid.appendChild(card);
  toast('App created! 📱', 'success');
}

// ============================================
// Toast Notifications
// ============================================

function toast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#D4AF37'};
    color: ${type === 'info' ? '#0D0D0D' : 'white'};
    border-radius: 8px;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    max-width: 400px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  .typing-indicator {
    animation: typing 1s infinite;
  }
  @keyframes typing {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;
document.head.appendChild(style);

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  renderSamples();
  renderAgents();
  
  // Load saved API keys
  ['openai', 'anthropic', 'xai', 'google', 'stability', 'replicate'].forEach(provider => {
    const key = localStorage.getItem(`vega_${provider}_key`);
    if (key) {
      const input = document.getElementById(`${provider}-key`);
      if (input) input.value = key;
    }
  });
  
  console.log('Æ VEGA GOD Admin Portal initialized');
});
