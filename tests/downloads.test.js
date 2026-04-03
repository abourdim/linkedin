/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');

beforeEach(() => {
  document.body.innerHTML = `
    <div id="download-bar"></div>
    <iframe id="content-frame"></iframe>
  `;
  loadModule('jobs/js/downloads.js');
});

describe('Downloads', () => {
  test('update() clears bar when no item', () => {
    Downloads.update(null, 'fr');
    expect(document.getElementById('download-bar').innerHTML).toBe('');
  });

  test('update() clears bar for jobs type', () => {
    Downloads.update({ type: 'jobs', downloads: { pdf: { fr: 'x.pdf' } } }, 'fr');
    expect(document.getElementById('download-bar').innerHTML).toBe('');
  });

  test('update() renders PDF button', () => {
    Downloads.update({ files: { fr: 'test.html' }, downloads: { pdf: { fr: 'test.pdf' } } }, 'fr');
    expect(document.getElementById('download-bar').innerHTML).toContain('PDF');
  });

  test('update() renders TXT button', () => {
    Downloads.update({ files: { fr: 'test.html' }, downloads: { txt: { fr: 'test.txt' } } }, 'fr');
    expect(document.getElementById('download-bar').innerHTML).toContain('TXT');
  });

  test('update() falls back to first available PDF lang', () => {
    Downloads.update({ files: { fr: 'test.html' }, downloads: { pdf: { en: 'en.pdf' } } }, 'fr');
    expect(document.getElementById('download-bar').innerHTML).toContain('en.pdf');
  });

  test('update() always adds copy buttons', () => {
    Downloads.update({ files: { fr: 'test.html' }, downloads: { pdf: { fr: 'test.pdf' } } }, 'fr');
    const bar = document.getElementById('download-bar').innerHTML;
    expect(bar).toContain('copyText');
    expect(bar).toContain('copyLink');
  });

  test('showToast() creates toast', () => {
    Downloads.showToast('Hello');
    const toast = document.getElementById('toast');
    expect(toast.textContent).toBe('Hello');
    expect(toast.style.opacity).toBe('1');
  });

  test('showToast() reuses existing toast', () => {
    Downloads.showToast('A');
    Downloads.showToast('B');
    expect(document.querySelectorAll('#toast')).toHaveLength(1);
    expect(document.getElementById('toast').textContent).toBe('B');
  });

  test('download() does not throw', () => {
    expect(() => Downloads.download('test.pdf')).not.toThrow();
  });
});
