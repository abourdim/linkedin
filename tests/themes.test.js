/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');

beforeEach(() => {
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
  document.body.innerHTML = `
    <div id="theme-switcher">
      <div class="theme-dot" data-theme="light"></div>
      <div class="theme-dot" data-theme="dark"></div>
      <div class="theme-dot" data-theme="blue"></div>
      <div class="theme-dot" data-theme="contrast"></div>
      <div class="theme-dot" data-theme="golden-age"></div>
      <div class="theme-dot" data-theme="alhambra"></div>
      <div class="theme-dot" data-theme="medina"></div>
    </div>
  `;
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false, media: query, addEventListener: jest.fn(),
    })),
  });
  loadModule('jobs/js/themes.js');
});

describe('Themes', () => {
  test('THEMES array has 7 themes', () => {
    expect(Themes.THEMES).toHaveLength(7);
  });

  test('set() applies theme to document and localStorage', () => {
    Themes.set('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  test('set() falls back to light for invalid theme', () => {
    Themes.set('nonexistent');
    expect(Themes.get()).toBe('light');
  });

  test('set() marks correct dot as active', () => {
    Themes.set('blue');
    document.querySelectorAll('.theme-dot').forEach(dot => {
      expect(dot.classList.contains('active')).toBe(dot.dataset.theme === 'blue');
    });
  });

  test('get() returns current theme', () => {
    Themes.set('alhambra');
    expect(Themes.get()).toBe('alhambra');
  });

  test('get() returns light as default', () => {
    expect(Themes.get()).toBe('light');
  });

  test('cycle() advances to next theme', () => {
    Themes.set('light');
    Themes.cycle();
    expect(Themes.get()).toBe('dark');
  });

  test('cycle() wraps around', () => {
    Themes.set('medina');
    Themes.cycle();
    expect(Themes.get()).toBe('light');
  });

  test('init() loads saved theme', () => {
    localStorage.setItem('portfolio-theme', 'contrast');
    Themes.init();
    expect(Themes.get()).toBe('contrast');
  });

  test('init() detects system dark preference', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query, addEventListener: jest.fn(),
      })),
    });
    Themes.init();
    expect(Themes.get()).toBe('dark');
  });

  test('dot click changes theme', () => {
    Themes.init();
    document.querySelector('[data-theme="blue"]').click();
    expect(Themes.get()).toBe('blue');
  });
});
