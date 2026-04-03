/* ═══════════════════════════════════════════════════════════
   THEMES.JS — 7 theme switcher with localStorage persistence
   Auto-detects dark mode preference
   ═══════════════════════════════════════════════════════════ */

const Themes = {
  THEMES: ['light', 'dark', 'blue', 'contrast', 'golden-age', 'alhambra', 'medina'],
  STORAGE_KEY: 'portfolio-theme',

  init() {
    // Load saved theme, detect system preference, or auto dark at night (20h-7h)
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 7;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches || isNight ? 'dark' : 'light';
    this.set(saved || preferred);

    // Bind theme dot clicks
    document.getElementById('theme-switcher').addEventListener('click', (e) => {
      const dot = e.target.closest('.theme-dot');
      if (!dot) return;
      this.set(dot.dataset.theme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.set(e.matches ? 'dark' : 'light');
      }
    });
  },

  set(theme) {
    if (!this.THEMES.includes(theme)) theme = 'light';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Update active dot
    document.querySelectorAll('.theme-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.theme === theme);
    });
  },

  get() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  cycle() {
    const current = this.get();
    const idx = this.THEMES.indexOf(current);
    const next = this.THEMES[(idx + 1) % this.THEMES.length];
    this.set(next);
  }
};
