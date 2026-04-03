/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = `
    <div id="sidebar"><div id="sidebar-nav"></div></div>
    <div id="sidebar-overlay"></div>
    <div id="hamburger-btn"></div>
    <div id="country-tabs">
      <div class="country-tab active" data-country="ch">CH</div>
      <div class="country-tab" data-country="fr">FR</div>
      <div class="country-tab" data-country="lu">LU</div>
      <div class="country-tab" data-country="gulf">Gulf</div>
    </div>
    <span id="breadcrumb-section"></span>
    <span id="breadcrumb-item"></span>
    <iframe id="content-frame"></iframe>
    <div id="jobs-panel"></div>
    <div id="download-bar"></div>
    <div id="theme-switcher"><div class="theme-dot" data-theme="light"></div></div>
    <div id="lang-switcher">
      <button class="lang-btn" data-lang="fr">FR</button>
      <button class="lang-btn" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="ar">AR</button>
    </div>
    <span data-i18n="sidebar.title"></span>
    <input id="cmd-input" placeholder="">
    <div id="cmd-overlay"><div id="cmd-results"></div></div>
    <button id="cmd-trigger"></button>
    <button id="edit-btn"></button>
  `;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false, media: query, addEventListener: jest.fn(),
    })),
  });

  loadModule('jobs/js/themes.js');
  loadModule('jobs/js/i18n.js');
  loadModule('jobs/js/downloads.js');
  loadModule('jobs/js/app.js');
});

describe('App CONTENT structure', () => {
  test('has 4 countries', () => {
    expect(Object.keys(App.CONTENT)).toEqual(['ch', 'fr', 'lu', 'gulf']);
  });

  test('each country has cv and jobs sections', () => {
    for (const c of Object.keys(App.CONTENT)) {
      expect(App.CONTENT[c]).toHaveProperty('cv');
      expect(App.CONTENT[c]).toHaveProperty('jobs');
    }
  });

  test('all items have id and labels', () => {
    for (const country of Object.values(App.CONTENT)) {
      for (const section of Object.values(country)) {
        for (const item of section.items) {
          expect(typeof item.id).toBe('string');
          expect(item).toHaveProperty('labels');
        }
      }
    }
  });

  test('non-job items have files with fr key', () => {
    for (const country of Object.values(App.CONTENT)) {
      for (const section of Object.values(country)) {
        for (const item of section.items) {
          if (item.type === 'jobs' || item.comingSoon) continue;
          expect(item.files).toHaveProperty('fr');
        }
      }
    }
  });

  test('all file paths start with ../', () => {
    for (const country of Object.values(App.CONTENT)) {
      for (const section of Object.values(country)) {
        for (const item of section.items) {
          if (item.files) {
            Object.values(item.files).forEach(p => expect(p).toMatch(/^\.\.\//));
          }
          if (item.downloads) {
            for (const dlType of Object.values(item.downloads)) {
              Object.values(dlType).forEach(p => expect(p).toMatch(/^\.\.\//));
            }
          }
        }
      }
    }
  });

  test('no duplicate item IDs within a country', () => {
    for (const country of Object.values(App.CONTENT)) {
      const ids = [];
      for (const section of Object.values(country)) {
        section.items.forEach(item => ids.push(item.id));
      }
      expect(ids.length).toBe(new Set(ids).size);
    }
  });
});

describe('App.findItem', () => {
  test('finds existing item', () => {
    const r = App.findItem('ch', 'cv-swiss');
    expect(r.section).toBe('cv');
    expect(r.item.id).toBe('cv-swiss');
  });

  test('returns empty for nonexistent', () => {
    expect(App.findItem('ch', 'nope').item).toBeUndefined();
  });

  test('returns empty for bad country', () => {
    expect(App.findItem('xx', 'cv-swiss')).toEqual({});
  });
});

describe('App.hasEdits', () => {
  test('false when no edits', () => {
    expect(App.hasEdits('cv-swiss')).toBe(false);
  });

  test('true when edit exists', () => {
    localStorage.setItem('edit-cv-swiss-fr', 'test');
    expect(App.hasEdits('cv-swiss')).toBe(true);
  });
});

describe('App.SECTION_ICONS', () => {
  test('has icon for every section', () => {
    const types = new Set();
    for (const country of Object.values(App.CONTENT)) {
      Object.keys(country).forEach(k => types.add(k));
    }
    types.forEach(t => expect(App.SECTION_ICONS).toHaveProperty(t));
  });
});

describe('App.buildSidebar', () => {
  test('generates sidebar HTML', () => {
    App.currentCountry = 'ch';
    I18n.current = 'fr';
    App.buildSidebar();
    const html = document.getElementById('sidebar-nav').innerHTML;
    expect(html).toContain('CV / Resume');
    expect(html).toContain('cv-swiss');
  });
});

describe('File integrity', () => {
  test('all referenced HTML files exist', () => {
    const fs = require('fs');
    const path = require('path');
    const missing = [];
    for (const country of Object.values(App.CONTENT)) {
      for (const section of Object.values(country)) {
        for (const item of section.items) {
          if (item.files) {
            for (const [lang, fp] of Object.entries(item.files)) {
              if (!fs.existsSync(path.resolve('jobs', fp))) missing.push(`${item.id}[${lang}]: ${fp}`);
            }
          }
        }
      }
    }
    expect(missing).toEqual([]);
  });

  test('all referenced download files exist', () => {
    const fs = require('fs');
    const path = require('path');
    const missing = [];
    for (const country of Object.values(App.CONTENT)) {
      for (const section of Object.values(country)) {
        for (const item of section.items) {
          if (item.downloads) {
            for (const [type, langs] of Object.entries(item.downloads)) {
              for (const [lang, fp] of Object.entries(langs)) {
                if (!fs.existsSync(path.resolve('jobs', fp))) missing.push(`${item.id}[${type}][${lang}]: ${fp}`);
              }
            }
          }
        }
      }
    }
    expect(missing).toEqual([]);
  });
});
