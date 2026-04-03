/**
 * @jest-environment jsdom
 */
const { loadModule } = require('./helpers');
const { TextEncoder } = require('util');
const { webcrypto } = require('crypto');

beforeEach(() => {
  globalThis.TextEncoder = TextEncoder;
  if (!globalThis.crypto?.subtle) {
    Object.defineProperty(globalThis, 'crypto', { value: webcrypto, writable: true });
  }
  localStorage.clear();
  document.body.innerHTML = `
    <div id="pin-screen">
      <div id="pin-dots">
        <span class="pin-dot"></span><span class="pin-dot"></span>
        <span class="pin-dot"></span><span class="pin-dot"></span>
        <span class="pin-dot"></span><span class="pin-dot"></span>
      </div>
      <div id="pin-keypad">
        <button class="pin-key" data-key="1">1</button>
        <button class="pin-key" data-key="delete">DEL</button>
        <button class="pin-key" data-key="enter">OK</button>
      </div>
      <div id="pin-error"></div>
    </div>
    <div id="app-shell"></div>
  `;

  loadModule('jobs/js/pin.js');
  PIN.code = '';
  PIN.attempts = 0;
  PIN.locked = false;
});

describe('PIN', () => {
  test('sha256 of 123456 matches HASH', async () => {
    expect(await PIN.sha256('123456')).toBe(PIN.HASH);
  });

  test('sha256 produces 64-char hex', async () => {
    const h = await PIN.sha256('test');
    expect(h).toHaveLength(64);
    expect(h).toMatch(/^[0-9a-f]+$/);
  });

  test('initial state', () => {
    expect(PIN.code).toBe('');
    expect(PIN.attempts).toBe(0);
    expect(PIN.locked).toBe(false);
    expect(PIN.MAX_ATTEMPTS).toBe(3);
  });

  test('updateDots fills correct count', () => {
    PIN.code = '12';
    PIN.updateDots();
    const dots = document.querySelectorAll('.pin-dot');
    expect(dots[0].classList.contains('filled')).toBe(true);
    expect(dots[1].classList.contains('filled')).toBe(true);
    expect(dots[2].classList.contains('filled')).toBe(false);
  });

  test('validate rejects short code', async () => {
    PIN.code = '12';
    await PIN.validate();
    expect(document.getElementById('pin-error').textContent).toContain('6 chiffres');
  });

  test('validate accepts correct PIN', async () => {
    PIN.code = '123456';
    await PIN.validate();
    expect(document.getElementById('pin-screen').classList.contains('hidden')).toBe(true);
  });

  test('validate saves session on success', async () => {
    PIN.code = '123456';
    await PIN.validate();
    expect(localStorage.getItem('portfolio-pin-session')).toBeTruthy();
  });

  test('validate rejects wrong PIN', async () => {
    PIN.code = '000000';
    await PIN.validate();
    expect(PIN.attempts).toBe(1);
    expect(PIN.code).toBe('');
  });

  test('lockout after MAX_ATTEMPTS', async () => {
    jest.useFakeTimers();
    for (let i = 0; i < 3; i++) {
      PIN.code = '000000';
      await PIN.validate();
    }
    expect(PIN.locked).toBe(true);
    jest.useRealTimers();
  });

  test('unlock hides PIN screen', () => {
    PIN.unlock();
    expect(document.getElementById('pin-screen').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('app-shell').classList.contains('visible')).toBe(true);
  });

  test('init skips PIN with valid session', async () => {
    localStorage.setItem('portfolio-pin-session', Date.now().toString());
    await PIN.init();
    expect(document.getElementById('pin-screen').classList.contains('hidden')).toBe(true);
  });

  test('init shows PIN if session expired', async () => {
    localStorage.setItem('portfolio-pin-session', (Date.now() - 86400001).toString());
    await PIN.init();
    expect(document.getElementById('pin-screen').classList.contains('hidden')).toBe(false);
  });

  test('showError sets text', () => {
    PIN.showError('test');
    expect(document.getElementById('pin-error').textContent).toBe('test');
  });
});
