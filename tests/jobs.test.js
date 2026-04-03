/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');

beforeEach(() => {
  document.body.innerHTML = `<div id="jobs-panel"></div>`;
  // I18n stub
  globalThis.I18n = { get: () => 'fr', t: (k) => ({ 'jobs.search': 'Rechercher', 'jobs.placeholder': 'embedded' }[k] || k) };
  loadModule('jobs/js/jobs.js');
});

describe('Jobs', () => {
  test('REGIONS has 4 countries', () => {
    expect(Object.keys(Jobs.REGIONS)).toEqual(['ch', 'fr', 'lu', 'gulf']);
  });

  test('each region has required properties', () => {
    for (const region of Object.values(Jobs.REGIONS)) {
      expect(region).toHaveProperty('country');
      expect(region).toHaveProperty('labels');
      expect(region).toHaveProperty('defaultQuery');
      expect(region).toHaveProperty('locations');
      expect(region).toHaveProperty('jobBoards');
    }
  });

  test('each job board has name and https url', () => {
    for (const region of Object.values(Jobs.REGIONS)) {
      region.jobBoards.forEach(board => {
        expect(board.name).toBeTruthy();
        expect(board.url).toMatch(/^https:\/\//);
      });
    }
  });

  test('each location has multilingual labels', () => {
    for (const region of Object.values(Jobs.REGIONS)) {
      region.locations.forEach(loc => {
        expect(loc.labels).toHaveProperty('fr');
        expect(loc.labels).toHaveProperty('en');
        expect(loc.labels).toHaveProperty('ar');
      });
    }
  });

  test('show() renders search bar', () => {
    Jobs.show('ch');
    const html = document.getElementById('jobs-panel').innerHTML;
    expect(html).toContain('jobs-query');
    expect(html).toContain('jobs-location');
  });

  test('show() renders job board links', () => {
    Jobs.show('ch');
    expect(document.getElementById('jobs-panel').innerHTML).toContain('jobs.ch');
  });

  test('show() renders API key message when no credentials', () => {
    Jobs.show('ch');
    expect(document.getElementById('jobs-panel').innerHTML).toContain('API Key Required');
  });

  test('renderJobCard() produces valid HTML', () => {
    const card = Jobs.renderJobCard({
      title: 'Test Job',
      company: { display_name: 'Corp' },
      location: { display_name: 'Geneva' },
      salary_min: 100000, salary_max: 130000,
      created: new Date().toISOString(),
      redirect_url: 'https://example.com'
    });
    expect(card).toContain('Test Job');
    expect(card).toContain('Corp');
    expect(card).toContain('Geneva');
    expect(card).toContain('100K - 130K');
  });

  test('renderJobCard() handles missing fields', () => {
    const card = Jobs.renderJobCard({});
    expect(card).toContain('Untitled');
    expect(card).toContain('Unknown');
  });

  test('renderJobCard() shows NEW for recent jobs', () => {
    expect(Jobs.renderJobCard({ created: new Date().toISOString() })).toContain('NEW');
  });

  test('renderJobCard() no NEW for old jobs', () => {
    expect(Jobs.renderJobCard({ created: new Date(Date.now() - 7 * 86400000).toISOString() })).not.toContain('NEW');
  });

  test('search() opens LinkedIn when no API key', () => {
    Jobs.show('ch');
    const spy = jest.spyOn(window, 'open').mockImplementation();
    Jobs.search();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('linkedin.com'), '_blank');
    spy.mockRestore();
  });
});
