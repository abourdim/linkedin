/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = `
    <button id="edit-btn"></button>
    <iframe id="content-frame"></iframe>
    <div id="download-bar"></div>
  `;
  globalThis.I18n = { get: () => 'fr', t: (k) => k };
  globalThis.Downloads = { showToast: jest.fn() };
  globalThis.App = { currentItem: { id: 'test-item' }, buildSidebar: jest.fn(), handleRoute: jest.fn() };
  loadModule('jobs/js/editor.js');
});

describe('Editor', () => {
  test('initial state is not editing', () => {
    expect(Editor.isEditing).toBe(false);
  });

  test('toggle() flips editing state', () => {
    Editor.toggle();
    expect(Editor.isEditing).toBe(true);
    Editor.toggle();
    expect(Editor.isEditing).toBe(false);
  });

  test('toggle() adds active class when editing', () => {
    Editor.toggle();
    expect(document.getElementById('edit-btn').classList.contains('active')).toBe(true);
  });

  test('reset() removes localStorage edit', () => {
    localStorage.setItem('edit-test-item-fr', 'test');
    Editor.reset();
    expect(localStorage.getItem('edit-test-item-fr')).toBeNull();
  });

  test('reset() calls App.handleRoute', () => {
    Editor.reset();
    expect(App.handleRoute).toHaveBeenCalled();
  });
});
