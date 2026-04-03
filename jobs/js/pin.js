/* ═══════════════════════════════════════════════════════════
   PIN.JS — 6-digit PIN access control
   Uses SHA-256 hash — PIN is never stored in clear text
   Session persists for 24h via localStorage
   ═══════════════════════════════════════════════════════════ */

const PIN = {
  // SHA-256 hash of the PIN (default: 123456)
  // To change: run in console: PIN.generateHash('yourpin')
  HASH: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  MAX_ATTEMPTS: 3,
  LOCKOUT_MS: 30000, // 30 seconds
  SESSION_MS: 24 * 60 * 60 * 1000, // 24 hours

  code: '',
  attempts: 0,
  locked: false,

  async init() {
    // Check if session is still valid
    const session = localStorage.getItem('portfolio-pin-session');
    if (session) {
      const ts = parseInt(session, 10);
      if (Date.now() - ts < this.SESSION_MS) {
        this.unlock();
        return;
      }
      localStorage.removeItem('portfolio-pin-session');
    }

    this.bindEvents();

    // Auto-unlock countdown (13 seconds) with progress bar
    let seconds = 13;
    const countdownEl = document.getElementById('pin-countdown');
    if (countdownEl) {
      countdownEl.innerHTML = `<div style="margin-bottom:6px">Ou patientez <span id="pin-secs">${seconds}</span>s pour l'accès libre</div><div style="width:200px;height:4px;background:#ddd;border-radius:2px;margin:0 auto;overflow:hidden"><div id="pin-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#0a66c2,#2e6db4);border-radius:2px;transition:width 1s linear"></div></div>`;
    }
    this.countdownInterval = setInterval(() => {
      seconds--;
      const secs = document.getElementById('pin-secs');
      const bar = document.getElementById('pin-bar');
      if (secs) secs.textContent = seconds;
      if (bar) bar.style.width = `${((13 - seconds) / 13) * 100}%`;
      if (seconds <= 0 && countdownEl) countdownEl.innerHTML = '';
    }, 1000);
    this.autoUnlockTimer = setTimeout(() => {
      clearInterval(this.countdownInterval);
      if (!document.getElementById('pin-screen').classList.contains('hidden')) {
        this.unlock();
      }
    }, 13000);
  },

  bindEvents() {
    // Keypad clicks
    document.getElementById('pin-keypad').addEventListener('click', (e) => {
      const key = e.target.closest('.pin-key');
      if (!key || this.locked) return;

      const val = key.dataset.key;
      if (val === 'delete') {
        this.code = this.code.slice(0, -1);
      } else if (val === 'enter') {
        this.validate();
      } else if (this.code.length < 6) {
        this.code += val;
      }

      // Auto-validate when 6 digits entered
      if (this.code.length === 6) {
        setTimeout(() => this.validate(), 150);
      }

      this.updateDots();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('pin-screen').classList.contains('hidden')) return;
      if (this.locked) return;

      if (e.key >= '0' && e.key <= '9' && this.code.length < 6) {
        this.code += e.key;
        this.updateDots();
        if (this.code.length === 6) {
          setTimeout(() => this.validate(), 150);
        }
      } else if (e.key === 'Backspace') {
        this.code = this.code.slice(0, -1);
        this.updateDots();
      } else if (e.key === 'Enter') {
        this.validate();
      }
    });
  },

  updateDots() {
    const dots = document.querySelectorAll('#pin-dots .pin-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('filled', i < this.code.length);
    });
  },

  async validate() {
    if (this.code.length !== 6) {
      this.showError('6 chiffres requis');
      return;
    }

    const hash = await this.sha256(this.code);

    if (hash === this.HASH) {
      // Success
      localStorage.setItem('portfolio-pin-session', Date.now().toString());
      this.unlock();
    } else {
      // Wrong PIN
      this.attempts++;
      this.code = '';
      this.updateDots();

      const screen = document.getElementById('pin-screen');
      screen.classList.add('shake');
      setTimeout(() => screen.classList.remove('shake'), 500);

      if (this.attempts >= this.MAX_ATTEMPTS) {
        this.lockout();
      } else {
        const remaining = this.MAX_ATTEMPTS - this.attempts;
        this.showError(`Code incorrect — ${remaining} essai${remaining > 1 ? 's' : ''} restant${remaining > 1 ? 's' : ''}`);
      }
    }
  },

  lockout() {
    this.locked = true;
    let seconds = this.LOCKOUT_MS / 1000;

    const timer = setInterval(() => {
      seconds--;
      this.showError(`Trop de tentatives — réessayez dans ${seconds}s`);
      if (seconds <= 0) {
        clearInterval(timer);
        this.locked = false;
        this.attempts = 0;
        this.showError('');
      }
    }, 1000);

    this.showError(`Trop de tentatives — réessayez dans ${seconds}s`);
  },

  unlock() {
    if (this.autoUnlockTimer) clearTimeout(this.autoUnlockTimer);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    const screen = document.getElementById('pin-screen');
    const shell = document.getElementById('app-shell');
    screen.classList.add('hidden');
    shell.classList.add('visible');

    // Initialize the app after unlock
    if (typeof App !== 'undefined') App.init();
  },

  showError(msg) {
    document.getElementById('pin-error').textContent = msg;
  },

  async sha256(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  },

  // Utility: generate hash for a new PIN
  // Usage: PIN.generateHash('123456').then(console.log)
  async generateHash(pin) {
    const hash = await this.sha256(pin);
    console.log(`PIN: ${pin} → Hash: ${hash}`);
    console.log(`Replace PIN.HASH with: '${hash}'`);
    return hash;
  }
};

// Initialize PIN on load
document.addEventListener('DOMContentLoaded', () => PIN.init());
