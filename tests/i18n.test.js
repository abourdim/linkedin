/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('dir');
  document.documentElement.removeAttribute('lang');
  document.body.innerHTML = `
    <div id="lang-switcher">
      <button class="lang-btn" data-lang="fr">FR</button>
      <button class="lang-btn" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="ar">AR</button>
    </div>
    <span data-i18n="sidebar.title"></span>
    <input id="cmd-input" placeholder="">
  `;
  loadModule('jobs/js/i18n.js');
});

describe('I18n', () => {
  test('LANGUAGES defines fr, en, ar', () => {
    expect(Object.keys(I18n.LANGUAGES)).toEqual(['fr', 'en', 'ar']);
  });

  test('ar is RTL', () => {
    expect(I18n.LANGUAGES.ar.dir).toBe('rtl');
    expect(I18n.LANGUAGES.fr.dir).toBe('ltr');
  });

  test('init() defaults to fr', () => {
    I18n.init();
    expect(I18n.get()).toBe('fr');
  });

  test('init() loads saved language', () => {
    localStorage.setItem('portfolio-lang', 'en');
    I18n.init();
    expect(I18n.get()).toBe('en');
  });

  test('set() updates current and localStorage', () => {
    I18n.init();
    I18n.set('ar');
    expect(I18n.get()).toBe('ar');
    expect(localStorage.getItem('portfolio-lang')).toBe('ar');
  });

  test('set() falls back to fr for invalid', () => {
    I18n.init();
    I18n.set('xx');
    expect(I18n.get()).toBe('fr');
  });

  test('apply() sets RTL for AR', () => {
    I18n.apply('ar');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  test('apply() translates data-i18n elements', () => {
    I18n.apply('en');
    expect(document.querySelector('[data-i18n="sidebar.title"]').textContent).toBe('Senior Embedded Engineer');
  });

  test('apply() sets cmd-input placeholder', () => {
    I18n.apply('fr');
    expect(document.getElementById('cmd-input').placeholder).toContain('Rechercher');
  });

  test('t() returns translation', () => {
    I18n.current = 'en';
    expect(I18n.t('jobs.search')).toBe('Search');
  });

  test('t() returns key when missing', () => {
    expect(I18n.t('nonexistent')).toBe('nonexistent');
  });

  test('sectionLabels covers all sections', () => {
    expect(Object.keys(I18n.sectionLabels)).toContain('cv');
    expect(Object.keys(I18n.sectionLabels)).toContain('jobs');
  });

  test('countryLabels has 4 countries', () => {
    expect(Object.keys(I18n.countryLabels)).toEqual(['ch', 'fr', 'lu', 'gulf']);
  });

  test('all strings have 3 languages', () => {
    for (const val of Object.values(I18n.strings)) {
      expect(val).toHaveProperty('fr');
      expect(val).toHaveProperty('en');
      expect(val).toHaveProperty('ar');
    }
  });

  test('lang button click switches language', () => {
    I18n.init();
    document.querySelector('[data-lang="ar"]').click();
    expect(I18n.get()).toBe('ar');
  });
});
