// ==UserScript==
// @name         K4D :: HOW LOW CAN U
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       K4D
// @description  Strategy auto-player for Stake.us Limbo. Unobfuscated source — read every line before you run it.
// @match        https://stake.us/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const K4D_LOGO = 'data:image/png;base64,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';

  // Limbo has 2 axes:
  //   B (bet)        — bet amount adjustment on win/loss
  //   M (multiplier) — target multiplier (1.01+); win = roll >= target
  // winChance% = 99 / target (1% house edge — same formula as dice).
  // Examples: target 2x → 49.5% chance; target 10x → 9.9%; target 100x → 0.99%.
  const STRATEGIES = {
    flat: {
      label: 'Flat 2x', tag: 'STEADY',
      desc: 'Same bet, target 2.00x every roll',
      target: 2.00,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'reset', onLossVal: 0, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    martingale: {
      label: 'Martingale 2x', tag: 'CLASSIC',
      desc: 'Double bet on loss, target 2.00x',
      target: 2.00,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'increase', onLossVal: 100, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    paroli: {
      label: 'Paroli 2x', tag: 'REVERSE M',
      desc: 'Double bet on win, reset on loss',
      target: 2.00,
      onWin: 'increase', onWinVal: 100, onWinType: 'percent',
      onLoss: 'reset', onLossVal: 0, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    dalembert: {
      label: "D'Alembert", tag: 'GRADUAL',
      desc: '+1 unit on loss, -1 unit on win, target 2x',
      target: 2.00,
      onWin: 'decrease', onWinVal: 0, onWinType: 'fixed',
      onLoss: 'increase', onLossVal: 0, onLossType: 'fixed',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    grinder: {
      label: 'Grinder', tag: 'LOW RISK',
      desc: 'Low target 1.10x, ~90% win rate, slow drip',
      target: 1.10,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'increase', onLossVal: 50, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    lotto: {
      label: 'Lotto 100x', tag: 'HIGH RISK',
      desc: 'Target 100x, ~1% chance to hit',
      target: 100,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'none', onLossVal: 0, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    moonShot: {
      label: 'Moon Shot 1000x', tag: 'EXTREME',
      desc: 'Target 1000x, ~0.1% chance — patience required',
      target: 1000,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'none', onLossVal: 0, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
    climber: {
      label: 'Target Climber', tag: 'DYNAMIC',
      desc: 'Push target higher after wins, back off after losses',
      target: 2.00,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'reset', onLossVal: 0, onLossType: 'percent',
      targetMode: 'dynamic', targetMin: 1.10, targetMax: 100,
      targetOnWin: 'increase', targetOnWinVal: 1.00, targetOnLoss: 'decrease', targetOnLossVal: 0.50,
    },
    fader: {
      label: 'Target Fader', tag: 'DYNAMIC',
      desc: 'Lower target after wins (lock gains), raise after losses',
      target: 2.00,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'reset', onLossVal: 0, onLossType: 'percent',
      targetMode: 'dynamic', targetMin: 1.10, targetMax: 100,
      targetOnWin: 'decrease', targetOnWinVal: 0.50, targetOnLoss: 'increase', targetOnLossVal: 1.00,
    },
    chaseDouble: {
      label: 'Chase Double', tag: 'COMPOUND',
      desc: 'Compound bet AND target on win (martingale on loss)',
      target: 2.00,
      onWin: 'increase', onWinVal: 100, onWinType: 'percent',
      onLoss: 'increase', onLossVal: 100, onLossType: 'percent',
      targetMode: 'dynamic', targetMin: 1.10, targetMax: 100,
      targetOnWin: 'increase', targetOnWinVal: 1.00, targetOnLoss: 'reset', targetOnLossVal: 0,
    },
    custom: {
      label: 'Custom', tag: 'MANUAL',
      desc: 'Full manual control of both axes',
      target: 2.00,
      onWin: 'reset', onWinVal: 0, onWinType: 'percent',
      onLoss: 'reset', onLossVal: 0, onLossType: 'percent',
      targetMode: 'fixed', targetMin: 1.01, targetMax: 1000000,
      targetOnWin: 'none', targetOnWinVal: 0, targetOnLoss: 'none', targetOnLossVal: 0,
    },
  };

  // ── State ──
  let authHeaders = {};
  let currentIdentifier = null;
  let isRunning = false;
  let stopRequested = false;
  let stats = { gamesPlayed: 0, wins: 0, losses: 0, totalWagered: 0, totalReturned: 0 };
  let currentBetAmount = 0;
  let currentTarget = 2.00;
  let consecutiveWins = 0;
  let consecutiveLosses = 0;
  let startingBalance = 0;
  let lastRoll = null;
  let lastResult = null;

  // 1% house edge: chance% = 99 / target. Verified on page UI: target 2.01 → 49.25%.
  function targetToChance(target) {
    if (!isFinite(target) || target <= 1) return 99;
    return 99 / target;
  }

  // ── Auth: tokens come from two independent sources, both fully automatic ──
  //   x-access-token = `session` cookie  (read via cookieStore API)
  //   x-lockdown-token = hardcoded string constant in Stake's bundle PuzceZiU.js,
  //                      exported as `L`. We fetch the current bundle and extract
  //                      the literal so we auto-update when Stake redeploys.
  // We keep a fetch interceptor as a safety net in case the bundle layout changes.

  const origFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
    const opts = args[1] || {};
    if (url && url.includes('_api/') && opts.headers) {
      const h = opts.headers instanceof Headers ? Object.fromEntries(opts.headers.entries()) : opts.headers;
      if (h['x-lockdown-token'] && !authHeaders['x-lockdown-token']) {
        authHeaders['x-lockdown-token'] = h['x-lockdown-token'];
      }
      if (h['x-access-token'] && !authHeaders['x-access-token']) {
        authHeaders['x-access-token'] = h['x-access-token'];
      }
    }
    return origFetch.apply(this, args);
  };

  async function readAccessTokenFromCookie() {
    if (authHeaders['x-access-token']) return true;
    try {
      const c = await cookieStore.get('session');
      if (c && c.value) {
        authHeaders['x-access-token'] = c.value;
        return true;
      }
    } catch (_) {}
    return false;
  }

  // Extract the lockdown token by reading PuzceZiU.js (Stake's config bundle) and
  // pulling the 20-char build-time constant. No user interaction required.
  async function readLockdownTokenFromBundle() {
    if (authHeaders['x-lockdown-token']) return true;
    try {
      const links = [...document.querySelectorAll('link[rel="modulepreload"]')]
        .map(l => l.href)
        .filter(u => /PuzceZiU/i.test(u) || /immutable\/chunks\//.test(u));
      // PuzceZiU is the deterministic name; if hashed differently, try any chunk preload.
      const candidates = links.length ? links : [...document.querySelectorAll('script[src]')].map(s => s.src);
      for (const url of candidates) {
        try {
          const txt = await origFetch(url, { credentials: 'omit' }).then(r => r.ok ? r.text() : null);
          if (!txt) continue;
          // The lockdown bundle has a 20-ish-char build-time literal as `const X="...";`
          // We scope tightly: 16-32 alphanumeric chars assigned to a single-letter const,
          // and the file is small (~1-3KB config bundle).
          if (txt.length > 4000) continue;
          const m = txt.match(/\bconst\s+[A-Za-z_$]\s*=\s*"([A-Za-z0-9]{16,32})"\s*;/);
          if (m) {
            authHeaders['x-lockdown-token'] = m[1];
            return true;
          }
        } catch (_) {}
      }
    } catch (_) {}
    return false;
  }

  authHeaders['Content-Type'] = 'application/json';

  // Fire off both lookups eagerly so they're ready by the time the user clicks START.
  (async () => {
    await readAccessTokenFromCookie();
    await readLockdownTokenFromBundle();
    const el = document.getElementById('mp-status');
    if (el && authHeaders['x-access-token'] && authHeaders['x-lockdown-token']) {
      el.textContent = 'Ready';
    }
  })();

  // ── Helpers ──
  function genId(len = 21) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    let id = '';
    for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  }

  function getBalance() {
    const el = document.querySelector('.coin-toggle');
    if (el) {
      const num = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) return num;
    }
    return 0;
  }

  function getCurrency() {
    const icon = document.querySelector('.coin-toggle svg[data-ds-icon]');
    if (icon) {
      const type = icon.getAttribute('data-ds-icon');
      if (type === 'SWEEPSTAKES' || type === 'SWEEPS' || type === 'SC') return 'sweepstakes';
    }
    return 'gold';
  }

  function getCurrencyLabel() {
    const icon = document.querySelector('.coin-toggle svg[data-ds-icon]');
    if (icon) {
      const type = icon.getAttribute('data-ds-icon');
      if (type === 'SWEEPSTAKES' || type === 'SWEEPS' || type === 'SC') return 'SC (Stake Cash)';
    }
    return 'GC (Gold Coins)';
  }

  async function apiCall(endpoint, body, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
      let resp;
      try {
        resp = await origFetch(`https://stake.us/_api/casino/limbo/${endpoint}`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(body),
          credentials: 'same-origin',
        });
      } catch (e) {
        if (attempt < retries - 1) {
          const wait = (attempt + 1) * 2000 + Math.random() * 1000;
          addLog(`Network error on ${endpoint}, retry in ${(wait / 1000).toFixed(1)}s...`, '#FF3399');
          await sleep(wait);
          continue;
        }
        throw new Error(`Network error on ${endpoint}: ${e.message}`);
      }

      if (resp.status >= 500) {
        if (attempt < retries - 1) {
          const wait = (attempt + 1) * 2000 + Math.random() * 1500;
          addLog(`Server ${resp.status} on ${endpoint}, retry in ${(wait / 1000).toFixed(1)}s...`, '#FF3399');
          await sleep(wait);
          continue;
        }
        throw new Error(`Server error ${endpoint}: ${resp.status} after ${retries} attempts`);
      }

      if (resp.status === 429) {
        const wait = 5000 + Math.random() * 5000;
        addLog(`Rate limited! Waiting ${(wait / 1000).toFixed(1)}s...`, '#FF3399');
        await sleep(wait);
        if (attempt < retries - 1) continue;
        throw new Error(`Rate limited on ${endpoint} after ${retries} attempts`);
      }

      if (resp.status >= 400) {
        let detail = '';
        try {
          const errBody = await resp.json();
          detail = errBody.message || errBody.error || JSON.stringify(errBody);
        } catch (_) { detail = `status ${resp.status}`; }
        throw new Error(`${endpoint} rejected (${resp.status}): ${detail}`);
      }

      return resp.json();
    }
  }

  function jitter(baseMs, variance) {
    return baseMs + Math.random() * variance;
  }

  function shouldPause() {
    return Math.random() < 0.1;
  }

  async function humanPause() {
    if (shouldPause()) {
      const pause = 1500 + Math.random() * 4000;
      addLog(`Pausing ${(pause / 1000).toFixed(1)}s...`, 'rgba(255,249,240,0.35)');
      await sleep(pause);
    }
  }


  // Inspect a GraphQL-style response envelope and throw on errors so callers
  // can't silently proceed when the server rejected the action.
  function unwrapResponse(endpoint, resp) {
    try { console.log(`[K4D] ${endpoint} response:`, JSON.stringify(resp, null, 2)); } catch (_) {}
    if (Array.isArray(resp?.errors) && resp.errors.length) {
      const msgs = resp.errors.map(e => e.message || e.code || e.errorType || JSON.stringify(e)).join(' | ');
      const err = new Error(msgs);
      err.errors = resp.errors;
      err.endpoint = endpoint;
      throw err;
    }
    return resp;
  }

  async function placeBet(amount, target) {
    currentIdentifier = genId();
    const body = {
      multiplierTarget: target,
      identifier: currentIdentifier,
      amount,
      currency: getCurrency(),
    };
    try { console.log('[K4D] bet request body:', JSON.stringify(body)); } catch (_) {}
    const resp = await apiCall('bet', body);
    return unwrapResponse('bet', resp);
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ── UI ──
  function generateSimData(stratKey) {
    const s = STRATEGIES[stratKey];
    if (!s) return [];
    const seq = [true, false, true, false, true];
    let bet = 1, target = s.target;
    const bars = [];
    for (let i = 0; i < 5; i++) {
      bars.push({ bet, target, win: seq[i] });
      const won = seq[i];
      if (won) {
        if (s.onWin === 'reset') bet = 1;
        else if (s.onWin === 'increase') bet = s.onWinType === 'percent' ? bet * (1 + s.onWinVal / 100) : bet + s.onWinVal;
        else if (s.onWin === 'decrease') bet = s.onWinType === 'percent' ? bet * (1 - s.onWinVal / 100) : bet - s.onWinVal;
      } else {
        if (s.onLoss === 'reset') bet = 1;
        else if (s.onLoss === 'increase') bet = s.onLossType === 'percent' ? bet * (1 + s.onLossVal / 100) : bet + s.onLossVal;
        else if (s.onLoss === 'decrease') bet = s.onLossType === 'percent' ? bet * (1 - s.onLossVal / 100) : bet - s.onLossVal;
      }
      bet = Math.max(0.2, Math.min(100, bet));
      if (s.targetMode === 'dynamic') {
        const tAct = won ? s.targetOnWin : s.targetOnLoss;
        const tVal = won ? s.targetOnWinVal : s.targetOnLossVal;
        if (tAct === 'reset') target = s.target;
        else if (tAct === 'increase') target += tVal;
        else if (tAct === 'decrease') target -= tVal;
        target = Math.max(s.targetMin || 1.01, Math.min(s.targetMax || 1000000, target));
      }
    }
    return bars;
  }

  function buildStrategyCards() {
    let html = '';
    for (const [key, s] of Object.entries(STRATEGIES)) {
      if (key === 'custom') continue;
      const bars = generateSimData(key);
      const maxBet = Math.max(0.01, ...bars.map(b => b.bet || 0));
      const barHtml = bars.map(b => {
        const safeBet = isFinite(b.bet) && b.bet > 0 ? b.bet : 0.01;
        const h = Math.max(12, (safeBet / maxBet) * 38);
        const color = b.win ? '#00E5FF' : '#FF00FF';
        const glow = b.win ? 'rgba(0,229,255,0.45)' : 'rgba(255,0,255,0.45)';
        return `<div style="width:14%;height:${h}px;background:${color};border-radius:2px;box-shadow:0 0 4px ${glow};transition:height 0.3s cubic-bezier(0.25,1,0.5,1)"></div>`;
      }).join('');
      const axisB = (s.onWin !== 'none' && s.onWin !== 'reset') || (s.onLoss !== 'none' && s.onLoss !== 'reset') || s.onWin === 'reset' || s.onLoss === 'reset' ? 'on' : 'off';
      const axisM = s.targetMode === 'dynamic' ? 'on' : 'off';
      const chance = targetToChance(s.target);
      html += `
        <div class="strat-card" data-key="${key}">
          <div class="strat-card-top">
            <div class="strat-card-name">${s.label}</div>
            <div class="strat-card-tag">${s.tag}</div>
          </div>
          <div class="strat-card-desc">${s.desc}</div>
          <div class="strat-card-axes">
            <span class="axis-pill axis-b ${axisB}" data-axis="bet" title="Bet adjustment">B</span>
            <span class="axis-pill axis-m ${axisM}" data-axis="target" title="Multiplier target adjustment">M</span>
          </div>
          <div class="strat-card-expand">
            <div class="strat-sim">${barHtml}</div>
            <div class="strat-nums">
              <span>${s.target.toFixed(2)}x</span>
              <span>${chance.toFixed(1)}%</span>
            </div>
          </div>
        </div>`;
    }
    return html;
  }

  function createPanel() {
    const panel = document.createElement('div');
    panel.id = 'k4d-auto';
    panel.dataset.game = 'limbo';
    panel.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Anybody:wght@400;700;900&family=Geist+Mono:wght@400;600&display=swap');
        /* K4D palette
           --black:#000000  --cyan:#00E5FF  --magenta:#FF00FF
           --azure:#0070FF  --cream:#FFF9F0  --pink:#FF3399  */
        #k4d-auto {
          position: fixed; top: 60px; right: 10px; z-index: 99999;
          width: 360px; background: #000000; border: 1px solid rgba(0,229,255,0.18);
          border-radius: 14px; color: #FFF9F0; font-family: 'Geist Mono', 'SF Mono', monospace;
          font-size: 11px;
          box-shadow:
            0 12px 48px rgba(0,0,0,0.8),
            0 0 0 1px rgba(0,229,255,0.04),
            0 0 32px rgba(0,229,255,0.06);
          max-height: 92vh; overflow-y: auto; overflow-x: hidden;
        }
        #k4d-auto::-webkit-scrollbar { width: 4px; }
        #k4d-auto::-webkit-scrollbar-track { background: transparent; }
        #k4d-auto::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.18); border-radius: 4px; }
        #k4d-auto::-webkit-scrollbar-thumb:hover { background: rgba(0,229,255,0.45); }
        #k4d-auto * { box-sizing: border-box; }

        /* Header */
        #k4d-auto .mp-hdr {
          background:
            radial-gradient(circle at 20% 0%, rgba(0,112,255,0.25), transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(255,0,255,0.12), transparent 60%),
            linear-gradient(135deg, #000000 0%, #050818 100%);
          padding: 10px 12px 6px 12px; border-radius: 13px 13px 0 0;
          cursor: move; display: flex; justify-content: space-between; align-items: center;
          user-select: none; position: sticky; top: 0; z-index: 1;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,229,255,0.12);
        }
        #k4d-auto .hdr-left {
          display: flex; align-items: center; gap: 8px;
        }
        #k4d-auto .hdr-logo {
          width: 38px; height: auto; image-rendering: -webkit-optimize-contrast;
          filter:
            drop-shadow(0 0 4px rgba(0,229,255,0.6))
            drop-shadow(0 0 10px rgba(255,0,255,0.25));
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s;
        }
        #k4d-auto .hdr-logo:hover {
          transform: scale(1.08) rotate(-3deg);
          filter:
            drop-shadow(0 0 6px rgba(0,229,255,0.9))
            drop-shadow(0 0 14px rgba(255,0,255,0.45));
        }
        #k4d-auto .mp-hdr h3 {
          margin: 0; font-family: 'Anybody', sans-serif; font-size: 13px;
          font-weight: 900; color: #00E5FF; letter-spacing: -0.3px;
          text-shadow: 0 0 8px rgba(0,229,255,0.45);
        }
        #k4d-auto .mp-hdr .hdr-sub {
          font-size: 9px; color: rgba(255,249,240,0.45); margin-top: 1px;
          display: flex; align-items: center; gap: 6px;
        }
        #k4d-auto .mp-hdr .hdr-sub a {
          color: #FF00FF; text-decoration: none; transition: all 0.15s;
          text-shadow: 0 0 4px rgba(255,0,255,0.3);
        }
        #k4d-auto .mp-hdr .hdr-sub a:hover {
          color: #FF3399; text-shadow: 0 0 8px rgba(255,51,153,0.6);
        }
        #k4d-auto .mp-hdr .hdr-bal {
          font-size: 10px; color: rgba(255,249,240,0.5); font-weight: 400;
          font-family: 'Geist Mono', monospace; text-align: right;
        }
        #k4d-auto .mp-hdr .hdr-bal strong {
          color: #FFF9F0; font-weight: 600; font-size: 11px; display: block;
        }
        #k4d-auto .mp-body { padding: 8px 10px 10px; }

        /* Common controls */
        #k4d-auto .r {
          display: flex; align-items: center; gap: 4px; margin-bottom: 5px;
          min-width: 0;
        }
        #k4d-auto .r label {
          flex: 0 0 50px; font-size: 10px; color: rgba(255,249,240,0.5);
          text-transform: uppercase; letter-spacing: 0.3px; font-weight: 600;
          white-space: nowrap;
        }
        #k4d-auto .r input, #k4d-auto .r select {
          flex: 1 1 0; min-width: 0; width: 100%;
          background: #000000; border: 1px solid rgba(0,229,255,0.18);
          color: #FFF9F0; padding: 4px 6px; border-radius: 5px;
          font-size: 11px;
          font-family: 'Geist Mono', monospace;
          transition: border-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s;
        }
        #k4d-auto .r input:focus, #k4d-auto .r select:focus {
          outline: none; border-color: #00E5FF;
          box-shadow: 0 0 0 2px rgba(0,229,255,0.15), 0 0 8px rgba(0,229,255,0.2);
        }
        #k4d-auto .b {
          padding: 3px 7px; border: 1px solid rgba(0,229,255,0.2); border-radius: 5px;
          cursor: pointer; font-size: 9px; font-weight: 600;
          background: rgba(0,229,255,0.04); color: rgba(255,249,240,0.7);
          flex-shrink: 0; transition: all 0.15s;
          font-family: 'Geist Mono', monospace;
          white-space: nowrap;
        }
        #k4d-auto .b:hover {
          background: rgba(0,229,255,0.12); color: #FFF9F0; border-color: #00E5FF;
          box-shadow: 0 0 8px rgba(0,229,255,0.2);
        }
        #k4d-auto .b:active { transform: scale(0.96); }

        /* Strategy grid */
        #k4d-auto .strat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 5px;
          margin-bottom: 6px;
        }

        /* Axis legend */
        #k4d-auto .axis-legend {
          display: flex; flex-wrap: wrap; align-items: center; gap: 4px;
          font-size: 9px; color: rgba(255,249,240,0.55);
          padding: 5px 7px; margin-bottom: 7px;
          background: rgba(0,112,255,0.05);
          border: 1px solid rgba(0,229,255,0.1);
          border-radius: 5px;
        }
        #k4d-auto .axis-legend .lg-chip {
          font-size: 8px; font-weight: 700; width: 14px; height: 14px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 3px; color: #000000;
        }
        #k4d-auto .axis-legend .lg-b { background: #00E5FF; box-shadow: 0 0 4px rgba(0,229,255,0.4); }
        #k4d-auto .axis-legend .lg-m { background: #FF00FF; box-shadow: 0 0 4px rgba(255,0,255,0.4); }
        #k4d-auto .axis-legend .lg-text {
          margin-right: 4px; color: #FFF9F0; font-weight: 600;
        }
        #k4d-auto .axis-legend .lg-hint {
          font-size: 8px; color: rgba(255,249,240,0.4);
          font-style: italic;
        }

        /* Bet row */
        #k4d-auto .bet-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
          margin-bottom: 8px;
        }
        #k4d-auto .bet-row .r { margin-bottom: 0; }
        #k4d-auto .bet-row label { flex: 0 0 auto; }

        /* Tiny select (single-char $/% etc.) */
        #k4d-auto .r .tiny-sel {
          flex: 0 0 38px; min-width: 0; width: 38px; padding-right: 2px;
        }

        /* Validation flash — when an input value is auto-corrected */
        #k4d-auto .invalid-flash {
          animation: mp-flash 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @keyframes mp-flash {
          0% {
            border-color: #FF00FF;
            box-shadow: 0 0 0 2px rgba(255,0,255,0.3), 0 0 12px rgba(255,0,255,0.4);
          }
          100% {
            border-color: rgba(0,229,255,0.18);
            box-shadow: none;
          }
        }

        #k4d-auto .strat-card {
          background: #000000; border: 1px solid rgba(0,229,255,0.15);
          border-radius: 8px; padding: 7px 8px; cursor: pointer; position: relative;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s cubic-bezier(0.25,1,0.5,1);
        }
        #k4d-auto .strat-card:hover {
          border-color: rgba(0,229,255,0.4); transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.6), 0 0 16px rgba(0,229,255,0.08);
        }
        #k4d-auto .strat-card.selected {
          border-color: #00E5FF;
          background: linear-gradient(135deg, rgba(0,112,255,0.15) 0%, rgba(0,0,0,0.2) 100%);
          box-shadow:
            0 0 0 1px rgba(0,229,255,0.3),
            0 4px 16px rgba(0,229,255,0.15),
            inset 0 0 20px rgba(0,229,255,0.05);
        }
        #k4d-auto .strat-card-top {
          display: flex; justify-content: space-between; align-items: center;
        }
        #k4d-auto .strat-card-name {
          font-size: 10px; font-weight: 700; color: #FFF9F0;
          font-family: 'Anybody', sans-serif;
        }
        #k4d-auto .strat-card-tag {
          font-size: 7px; color: #FF00FF; font-weight: 700;
          background: rgba(255,0,255,0.12); border-radius: 3px;
          padding: 1px 4px; letter-spacing: 0.5px;
          text-shadow: 0 0 3px rgba(255,0,255,0.4);
        }
        #k4d-auto .strat-card-desc {
          font-size: 8px; color: rgba(255,249,240,0.5); margin: 3px 0 4px; line-height: 1.3;
        }
        #k4d-auto .strat-card-axes {
          display: flex; gap: 3px;
        }
        #k4d-auto .axis-pill {
          font-size: 8px; font-weight: 700; width: 16px; height: 14px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 3px; cursor: pointer;
          transition: all 0.15s;
          user-select: none;
        }
        #k4d-auto .axis-pill.on { color: #000000; }
        #k4d-auto .axis-pill.off {
          background: rgba(255,249,240,0.06); color: rgba(255,249,240,0.3);
        }
        #k4d-auto .axis-pill.axis-b.on {
          background: #00E5FF; box-shadow: 0 0 6px rgba(0,229,255,0.5);
        }
        #k4d-auto .axis-pill.axis-m.on {
          background: #FF00FF; box-shadow: 0 0 6px rgba(255,0,255,0.5);
        }
        #k4d-auto .axis-pill:hover { transform: scale(1.15); }

        /* Card expand on hover */
        #k4d-auto .strat-card-expand {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s ease;
          margin-top: 0;
        }
        #k4d-auto .strat-card:hover .strat-card-expand {
          max-height: 60px; opacity: 1; margin-top: 5px;
        }
        #k4d-auto .strat-sim {
          display: flex; align-items: flex-end; gap: 3px;
          height: 38px; padding: 2px 0;
        }
        #k4d-auto .strat-nums {
          display: flex; gap: 6px; font-size: 8px; color: rgba(255,249,240,0.45);
          margin-top: 2px;
        }

        /* Play button */
        #k4d-auto .play-btn {
          width: 100%; padding: 9px; font-size: 12px; font-weight: 700;
          border-radius: 8px; border: none; cursor: pointer;
          font-family: 'Anybody', sans-serif; letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 0.12s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s;
        }
        #k4d-auto .play-btn:hover { transform: translateY(-1px); }
        #k4d-auto .play-btn:active { transform: translateY(1px) scale(0.98); }
        #k4d-auto .play-go {
          background: linear-gradient(135deg, #00E5FF 0%, #0070FF 100%);
          color: #000000;
          box-shadow:
            0 4px 16px rgba(0,229,255,0.35),
            0 0 0 1px rgba(0,229,255,0.4),
            inset 0 1px 0 rgba(255,255,255,0.3);
          text-shadow: 0 1px 0 rgba(255,255,255,0.2);
        }
        #k4d-auto .play-go:hover {
          box-shadow:
            0 6px 24px rgba(0,229,255,0.55),
            0 0 0 1px rgba(0,229,255,0.6),
            inset 0 1px 0 rgba(255,255,255,0.4);
        }
        #k4d-auto .play-stop {
          background: linear-gradient(135deg, #FF00FF 0%, #FF3399 100%);
          color: #FFF9F0;
          box-shadow:
            0 4px 16px rgba(255,0,255,0.4),
            0 0 0 1px rgba(255,0,255,0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
          text-shadow: 0 1px 0 rgba(0,0,0,0.4);
        }

        /* Sections */
        #k4d-auto .s { padding-top: 6px; margin-top: 6px; }
        #k4d-auto .s + .s { border-top: 1px solid rgba(0,229,255,0.06); }
        #k4d-auto .st {
          font-size: 9px; color: #00E5FF; font-weight: 700; margin-bottom: 4px;
          text-transform: uppercase; letter-spacing: 1.2px;
          font-family: 'Anybody', sans-serif;
          text-shadow: 0 0 6px rgba(0,229,255,0.35);
        }
        #k4d-auto .g2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
        }
        #k4d-auto .g2 .r { margin-bottom: 0; }
        #k4d-auto .g2 .r label { flex: 0 0 auto; min-width: 0; }

        /* Advanced toggle */
        #k4d-auto .adv-toggle {
          width: 100%; background: rgba(0,112,255,0.06);
          border: 1px solid rgba(0,229,255,0.15);
          border-radius: 6px; padding: 5px 10px; cursor: pointer;
          color: rgba(255,249,240,0.55); font-size: 10px; font-weight: 600;
          font-family: 'Geist Mono', monospace; text-align: left;
          transition: all 0.15s; margin-top: 6px;
        }
        #k4d-auto .adv-toggle:hover {
          border-color: #00E5FF; color: #FFF9F0;
          background: rgba(0,229,255,0.08);
          box-shadow: 0 0 8px rgba(0,229,255,0.15);
        }
        #k4d-auto .adv-section {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
        }
        #k4d-auto .adv-section.open {
          max-height: 2000px; opacity: 1;
        }

        /* Stats & log */
        #k4d-auto .stats-box {
          background: #000000; border: 1px solid rgba(0,229,255,0.1);
          border-radius: 6px; padding: 6px 8px;
          font-size: 10px; line-height: 1.7;
        }
        #k4d-auto .status {
          background: #000000; border: 1px solid rgba(0,229,255,0.1);
          border-radius: 5px; padding: 5px 8px;
          font-size: 10px; color: rgba(255,249,240,0.6); margin-top: 5px;
          min-height: 16px; word-break: break-word; line-height: 1.4;
          transition: color 0.3s;
        }
        #k4d-auto .info-row {
          display: flex; justify-content: space-between; font-size: 10px;
          color: rgba(255,249,240,0.5); margin-bottom: 2px;
        }
        #k4d-auto .info-row span:last-child { color: #00E5FF; font-weight: 600; }
        #k4d-auto .log-box {
          background: #000000; border: 1px solid rgba(0,229,255,0.1);
          border-radius: 6px; padding: 5px 7px;
          font-size: 9px; line-height: 1.5; max-height: 90px; overflow-y: auto;
          font-family: 'Geist Mono', monospace; color: rgba(255,249,240,0.55);
        }
        #k4d-auto .log-box div {
          animation: mp-fadein 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @keyframes mp-fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* WL rows */
        #k4d-auto .wl {
          display: flex; gap: 3px; align-items: center; flex: 1 1 0; min-width: 0;
        }
        #k4d-auto .wl > select:first-of-type { flex: 1 1 0; min-width: 0; }
        #k4d-auto .wl > input { flex: 0 0 56px; min-width: 0; width: 56px; }
        #k4d-auto .wl > select:last-of-type:not(:first-of-type) {
          flex: 0 0 38px; min-width: 0; width: 38px; padding-right: 2px;
        }
        #k4d-auto .wl-row {
          display: flex; align-items: center; gap: 4px; margin-bottom: 4px;
          min-width: 0;
        }
        #k4d-auto .wl-row .wl-tag {
          flex: 0 0 30px; font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        #k4d-auto .wl-row .wl-tag.win {
          color: #00E5FF; text-shadow: 0 0 4px rgba(0,229,255,0.4);
        }
        #k4d-auto .wl-row .wl-tag.loss {
          color: #FF00FF; text-shadow: 0 0 4px rgba(255,0,255,0.4);
        }

        #k4d-auto .cbtn {
          background: none; border: none; color: rgba(255,249,240,0.4);
          cursor: pointer; font-size: 14px; padding: 2px 6px;
          transition: color 0.15s, text-shadow 0.15s;
        }
        #k4d-auto .cbtn:hover {
          color: #00E5FF; text-shadow: 0 0 6px rgba(0,229,255,0.5);
        }

        /* Footer */
        #k4d-auto .mp-footer {
          padding: 6px 10px; border-top: 1px solid rgba(0,229,255,0.08);
          font-size: 8px; color: rgba(255,249,240,0.3);
          text-align: center; line-height: 1.5;
        }
      </style>

      <div class="mp-hdr" id="mp-drag">
        <div class="hdr-left">
          <img src="${K4D_LOGO}" class="hdr-logo" alt="K4D" />
          <div>
            <h3>K4D :: HOW LOW CAN U</h3>
            <div class="hdr-sub">
              <span id="mp-curr">...</span>
              <a href="https://x.com/kitty4dhd" target="_blank">@kitty4dhd</a>
            </div>
          </div>
        </div>
        <div class="hdr-bal">
          <strong id="mp-bal">...</strong>
          <button class="cbtn" id="mp-collapse">−</button>
        </div>
      </div>
      <div class="mp-body" id="mp-body">

        <!-- SIMPLE VIEW: Strategy Grid -->
        <div class="strat-grid" id="mp-strat-grid">
          ${buildStrategyCards()}
        </div>

        <!-- Axis legend -->
        <div class="axis-legend">
          <span class="lg-chip lg-b">B</span><span class="lg-text">Bet</span>
          <span class="lg-chip lg-m">M</span><span class="lg-text">Multiplier</span>
          <span class="lg-hint">Toggle axes a strategy controls</span>
        </div>

        <!-- Bet & Budget -->
        <div class="bet-row">
          <div class="r">
            <label title="Amount wagered on each game (min set in Advanced)">Bet/Game</label>
            <input type="number" id="mp-bet-start" value="1.67" min="0.10" step="0.01" title="Auto-clamps to min bet">
            <button class="b" id="mp-divide" title="Bet = Budget ÷ Max Games">÷</button>
          </div>
          <div class="r">
            <label title="Max total amount to wager across the whole session">Budget</label>
            <input type="number" id="mp-total" value="10" min="0" step="0.01">
            <button class="b" id="mp-max" title="Use full balance">MAX</button>
          </div>
        </div>

        <!-- Play + Status -->
        <button class="play-btn play-go" id="mp-play">START</button>
        <div class="status" id="mp-status">Initializing…</div>

        <!-- Stats -->
        <div class="s" style="border:0;padding-top:4px;margin-top:4px">
          <div class="stats-box" id="mp-stats">
            Games: 0 &nbsp;|&nbsp; W: 0 &nbsp;|&nbsp; L: 0<br>
            Wagered: 0.00 &nbsp;|&nbsp; Returned: 0.00<br>
            Net: 0.00 &nbsp;|&nbsp; Bet: —
          </div>
        </div>

        <!-- Game Log -->
        <div class="s">
          <div class="st" style="display:flex;justify-content:space-between;align-items:center">
            Log <button class="b" id="mp-clear-log" style="padding:1px 5px;font-size:9px">Clear</button>
          </div>
          <div class="log-box" id="mp-log"></div>
        </div>

        <!-- ADVANCED TOGGLE -->
        <button class="adv-toggle" id="mp-adv-toggle">Advanced ▸</button>
        <div class="adv-section" id="mp-advanced">

          <!-- Session Limits -->
          <div class="s">
            <div class="st">Session Limits</div>
            <div class="r"><label>Max Games</label><input type="number" id="mp-games-max" value="100" min="1" step="1"></div>
          </div>

          <!-- Limbo Config -->
          <div class="s">
            <div class="st">Limbo Config</div>
            <div class="r"><label>Target</label><input type="number" id="mp-target" value="2.00" min="1.01" step="0.01" title="Target multiplier — win if roll ≥ this value"></div>
            <div class="info-row" style="margin-top:3px">
              <span>Win Chance</span><span id="mp-chance-display">49.50%</span>
            </div>
          </div>

          <!-- Bet Sizing -->
          <div class="s">
            <div class="st">Bet Limits</div>
            <div class="g2">
              <div class="r"><label>Min</label><input type="number" id="mp-bet-min" value="0.20" min="0.01" step="0.01" title="Floor: GC = 0.10, SC = 0.01. Values below the active floor are clamped."></div>
              <div class="r"><label>Max</label><input type="number" id="mp-bet-max" value="50.00" min="0" step="0.01"></div>
            </div>
          </div>

          <!-- Bet Adjust -->
          <div class="s">
            <div class="st">Bet Adjust</div>
            <div class="wl-row">
              <span class="wl-tag win">WIN</span>
              <div class="wl">
                <select id="mp-on-win">
                  <option value="reset" selected>Reset</option>
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
                <input type="number" id="mp-on-win-val" value="0" min="0" step="1">
                <select id="mp-on-win-type">
                  <option value="percent" selected>%</option>
                  <option value="fixed">$</option>
                </select>
              </div>
            </div>
            <div class="wl-row">
              <span class="wl-tag loss">LOSS</span>
              <div class="wl">
                <select id="mp-on-loss">
                  <option value="reset">Reset</option>
                  <option value="increase" selected>Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
                <input type="number" id="mp-on-loss-val" value="100" min="0" step="1">
                <select id="mp-on-loss-type">
                  <option value="percent" selected>%</option>
                  <option value="fixed">$</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Multiplier Adjust -->
          <div class="s">
            <div class="st">Multiplier Adjust</div>
            <div class="r"><label>Mode</label>
              <select id="mp-target-mode">
                <option value="fixed" selected>Fixed</option>
                <option value="dynamic">Dynamic</option>
              </select>
            </div>
            <div id="mp-target-dynamic" style="display:none">
              <div class="g2">
                <div class="r"><label>Min</label><input type="number" id="mp-target-min" value="1.10" min="1.01" step="0.01"></div>
                <div class="r"><label>Max</label><input type="number" id="mp-target-max" value="100" min="1.01" step="0.01"></div>
              </div>
              <div class="wl-row">
                <span class="wl-tag win">WIN</span>
                <div class="wl">
                  <select id="mp-target-on-win">
                    <option value="none" selected>No change</option>
                    <option value="reset">Reset</option>
                    <option value="increase">+N</option>
                    <option value="decrease">-N</option>
                  </select>
                  <input type="number" id="mp-target-on-win-val" value="1.00" min="0" step="0.01">
                </div>
              </div>
              <div class="wl-row">
                <span class="wl-tag loss">LOSS</span>
                <div class="wl">
                  <select id="mp-target-on-loss">
                    <option value="none" selected>No change</option>
                    <option value="reset">Reset</option>
                    <option value="increase">+N</option>
                    <option value="decrease">-N</option>
                  </select>
                  <input type="number" id="mp-target-on-loss-val" value="0.50" min="0" step="0.01">
                </div>
              </div>
              <div class="info-row" style="margin-top:3px">
                <span>Current Target</span>
                <span id="mp-target-current">2.00x</span>
              </div>
            </div>
          </div>

          <!-- Stop Conditions -->
          <div class="s">
            <div class="st">Stop At</div>
            <div class="g2">
              <div class="r"><label>Gain</label><input type="number" id="mp-stop-gain" value="" placeholder="off" min="0" step="0.01"><select id="mp-stop-gain-type" class="tiny-sel"><option value="fixed">$</option><option value="percent">%</option></select></div>
              <div class="r"><label>Loss</label><input type="number" id="mp-stop-loss" value="" placeholder="off" min="0" step="0.01"><select id="mp-stop-loss-type" class="tiny-sel"><option value="fixed">$</option><option value="percent">%</option></select></div>
            </div>
          </div>

        </div><!-- end advanced -->

        <!-- Footer -->
        <div class="mp-footer">
          Unobfuscated source — read every line before you run it.
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    setupDrag(panel, document.getElementById('mp-drag'));
    bindEvents();
    startPoller();
  }

  function setupDrag(el, handle) {
    let ox, oy, dragging = false;
    handle.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;
      dragging = true;
      ox = e.clientX - el.getBoundingClientRect().left;
      oy = e.clientY - el.getBoundingClientRect().top;
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      el.style.left = (e.clientX - ox) + 'px';
      el.style.top = (e.clientY - oy) + 'px';
      el.style.right = 'auto';
    });
    document.addEventListener('mouseup', () => dragging = false);
  }

  let selectedStrategy = 'balanced';
  let axisToggles = { bet: true, target: true };

  // Platform hard floor — Stake.us rejects bets below this regardless of user settings
  // Currency-dependent platform floor: GC=0.10, SC=0.01 for Originals.
  function getPlatformFloor() {
    return getCurrency() === 'sweepstakes' ? 0.01 : 0.10;
  }

  function getMinBet() {
    const floor = getPlatformFloor();
    const userMin = parseFloat(document.getElementById('mp-bet-min')?.value);
    if (isNaN(userMin) || userMin < floor) return floor;
    return userMin;
  }

  function flashInvalid(el) {
    el.classList.add('invalid-flash');
    setTimeout(() => el.classList.remove('invalid-flash'), 500);
  }

  function clampBet(inputEl, opts = {}) {
    const min = getMinBet();
    let val = parseFloat(inputEl.value);
    if (isNaN(val) || val < min) {
      inputEl.value = min.toFixed(2);
      if (opts.flash !== false) flashInvalid(inputEl);
      return min;
    }
    return val;
  }

  function bindEvents() {
    const $ = id => document.getElementById(id);

    $('mp-collapse').addEventListener('click', () => {
      const body = $('mp-body');
      const btn = $('mp-collapse');
      body.style.display = body.style.display === 'none' ? 'block' : 'none';
      btn.textContent = body.style.display === 'none' ? '+' : '−';
    });

    $('mp-max').addEventListener('click', () => {
      $('mp-total').value = getBalance().toFixed(2);
    });

    $('mp-divide').addEventListener('click', () => {
      const total = parseFloat($('mp-total').value) || 0;
      const maxGames = parseInt($('mp-games-max').value) || 10;
      const min = getMinBet();
      let computed = total / maxGames;
      if (computed < min) {
        computed = min;
        flashInvalid($('mp-bet-start'));
      }
      $('mp-bet-start').value = computed.toFixed(2);
    });

    // Bet/Game: enforce min bet on blur/change
    $('mp-bet-start').addEventListener('blur', (e) => clampBet(e.target));
    $('mp-bet-start').addEventListener('change', (e) => clampBet(e.target));

    // Min bet changed in Advanced — refloor everything that depends on it
    $('mp-bet-min').addEventListener('change', (e) => {
      const min = getMinBet();
      e.target.value = min.toFixed(2);
      $('mp-bet-start').min = min;
      // Re-clamp Bet/Game silently if user lowered min below current bet, no flash needed
      const cur = parseFloat($('mp-bet-start').value);
      if (cur < min) {
        $('mp-bet-start').value = min.toFixed(2);
        flashInvalid($('mp-bet-start'));
      }
    });

    // Initialize Bet/Game min attribute from current config
    $('mp-bet-start').min = getMinBet();

    // Strategy card selection
    document.querySelectorAll('#mp-strat-grid .strat-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('axis-pill')) return;
        document.querySelectorAll('#mp-strat-grid .strat-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedStrategy = card.dataset.key;
        applyPreset(selectedStrategy);
      });
    });

    // Axis toggle pills
    document.querySelectorAll('#mp-strat-grid .axis-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const axis = pill.dataset.axis;
        const isOn = pill.classList.contains('on');
        pill.classList.toggle('on', !isOn);
        pill.classList.toggle('off', isOn);
        axisToggles[axis] = !isOn;
      });
    });

    // Advanced toggle
    $('mp-adv-toggle').addEventListener('click', () => {
      const section = $('mp-advanced');
      const btn = $('mp-adv-toggle');
      const isOpen = section.classList.contains('open');
      section.classList.toggle('open', !isOpen);
      btn.textContent = isOpen ? 'Advanced ▸' : 'Advanced ▾';
    });

    $('mp-target').addEventListener('change', updateChanceDisplay);
    $('mp-target').addEventListener('input', updateChanceDisplay);

    $('mp-target-mode').addEventListener('change', () => {
      const dyn = $('mp-target-dynamic');
      dyn.style.display = $('mp-target-mode').value === 'dynamic' ? 'block' : 'none';
    });

    $('mp-play').addEventListener('click', () => {
      if (isRunning) {
        stopRequested = true;
        updateStatus('Stopping after current game...');
      } else {
        startAutoPlay();
      }
    });

    $('mp-clear-log').addEventListener('click', () => { $('mp-log').innerHTML = ''; });

    // Default to "flat" strategy
    const defaultCard = document.querySelector('#mp-strat-grid .strat-card[data-key="flat"]');
    if (defaultCard) {
      defaultCard.classList.add('selected');
      selectedStrategy = 'flat';
      applyPreset('flat');
    }
  }


  function applyPreset(key) {
    if (!key) key = selectedStrategy;
    const s = STRATEGIES[key];
    if (!s) return;

    document.getElementById('mp-target').value = s.target;

    if (axisToggles.bet) {
      document.getElementById('mp-on-win').value = s.onWin;
      document.getElementById('mp-on-win-val').value = s.onWinVal;
      document.getElementById('mp-on-win-type').value = s.onWinType;
      document.getElementById('mp-on-loss').value = s.onLoss;
      document.getElementById('mp-on-loss-val').value = s.onLossVal;
      document.getElementById('mp-on-loss-type').value = s.onLossType;
      if (key === 'dalembert') {
        const startBet = parseFloat(document.getElementById('mp-bet-start').value) || 1;
        document.getElementById('mp-on-win-val').value = startBet.toFixed(2);
        document.getElementById('mp-on-loss-val').value = startBet.toFixed(2);
      }
    }

    if (axisToggles.target) {
      document.getElementById('mp-target-mode').value = s.targetMode || 'fixed';
      document.getElementById('mp-target-min').value = s.targetMin || 1.01;
      document.getElementById('mp-target-max').value = s.targetMax || 1000000;
      document.getElementById('mp-target-on-win').value = s.targetOnWin || 'none';
      document.getElementById('mp-target-on-win-val').value = s.targetOnWinVal || 0;
      document.getElementById('mp-target-on-loss').value = s.targetOnLoss || 'none';
      document.getElementById('mp-target-on-loss-val').value = s.targetOnLossVal || 0;
      const dynPanel = document.getElementById('mp-target-dynamic');
      if (dynPanel) dynPanel.style.display = (s.targetMode === 'dynamic') ? 'block' : 'none';
    }

    updateChanceDisplay();
  }

  function updateChanceDisplay() {
    const t = parseFloat(document.getElementById('mp-target')?.value) || 2.00;
    const c = targetToChance(t);
    const el = document.getElementById('mp-chance-display');
    if (el) el.textContent = c.toFixed(2) + '%';
  }

  function startPoller() {
    const update = () => {
      const panel = document.getElementById('k4d-auto');
      if (!panel || panel.dataset.game !== 'limbo') return;
      if (!location.pathname.startsWith('/casino/games/limbo')) {
        panel.remove();
        return;
      }
      const bal = getBalance();
      document.getElementById('mp-bal').textContent = bal.toLocaleString('en-US', { minimumFractionDigits: 2 });
      document.getElementById('mp-curr').textContent = getCurrencyLabel();
      const st = document.getElementById('mp-status');
      if (st && st.textContent === 'Initializing…' && authHeaders['x-access-token'] && authHeaders['x-lockdown-token']) {
        st.textContent = 'Ready';
      }
    };
    update();
    setInterval(update, 2000);
  }

  function updateStatus(msg) {
    const el = document.getElementById('mp-status');
    if (el) el.textContent = msg;
  }

  function addLog(msg, color) {
    const el = document.getElementById('mp-log');
    if (!el) return;
    const line = document.createElement('div');
    line.style.color = color || 'rgba(255,249,240,0.55)';
    const now = new Date();
    const ts = now.toLocaleTimeString('en-US', { hour12: false });
    line.textContent = `[${ts}] ${msg}`;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
    if (el.children.length > 200) el.removeChild(el.firstChild);
  }

  function updateStats() {
    const net = stats.totalReturned - stats.totalWagered;
    const el = document.getElementById('mp-stats');
    if (!el) return;
    const netColor = net >= 0 ? '#00E5FF' : '#FF00FF';
    const netGlow = net >= 0 ? 'rgba(0,229,255,0.5)' : 'rgba(255,0,255,0.5)';
    const netSign = net >= 0 ? '+' : '';
    const targetMode = document.getElementById('mp-target-mode')?.value;
    const targetInfo = targetMode === 'dynamic' ? ` &nbsp;|&nbsp; Tgt: ${currentTarget.toFixed(2)}x` : '';
    const lastInfo = lastRoll !== null ? ` &nbsp;|&nbsp; Last: ${lastRoll.toFixed(2)}x (${lastResult})` : '';
    el.innerHTML =
      `Rolls: ${stats.gamesPlayed} &nbsp;|&nbsp; W: ${stats.wins} &nbsp;|&nbsp; L: ${stats.losses}<br>` +
      `Wagered: ${stats.totalWagered.toFixed(2)} &nbsp;|&nbsp; Returned: ${stats.totalReturned.toFixed(2)}<br>` +
      `Net: <span style="color:${netColor};text-shadow:0 0 6px ${netGlow}">${netSign}${net.toFixed(2)}</span>` +
      ` &nbsp;|&nbsp; Bet: ${currentBetAmount.toFixed(2)}${targetInfo}${lastInfo}`;
  }

  // ── Bet adjustment ──
  function adjustBet(won) {
    const sel = won ? 'mp-on-win' : 'mp-on-loss';
    const vId = won ? 'mp-on-win-val' : 'mp-on-loss-val';
    const tId = won ? 'mp-on-win-type' : 'mp-on-loss-type';

    const action = document.getElementById(sel).value;
    const val = parseFloat(document.getElementById(vId).value) || 0;
    const type = document.getElementById(tId).value;
    const startAmt = parseFloat(document.getElementById('mp-bet-start').value) || 1;
    const minBet = parseFloat(document.getElementById('mp-bet-min').value) || 0.2;
    const maxBet = parseFloat(document.getElementById('mp-bet-max').value) || 100;

    if (action === 'reset') {
      currentBetAmount = startAmt;
    } else if (action === 'increase') {
      currentBetAmount = type === 'percent'
        ? currentBetAmount * (1 + val / 100)
        : currentBetAmount + val;
    } else if (action === 'decrease') {
      currentBetAmount = type === 'percent'
        ? currentBetAmount * (1 - val / 100)
        : currentBetAmount - val;
    }

    currentBetAmount = Math.max(minBet, Math.min(maxBet, currentBetAmount));
    currentBetAmount = parseFloat(currentBetAmount.toFixed(2));
  }

  // ── Target multiplier adjustment ──
  function adjustTarget(won) {
    const mode = document.getElementById('mp-target-mode')?.value;
    if (mode !== 'dynamic') return;

    const sel = won ? 'mp-target-on-win' : 'mp-target-on-loss';
    const vId = won ? 'mp-target-on-win-val' : 'mp-target-on-loss-val';

    const action = document.getElementById(sel).value;
    const val = parseFloat(document.getElementById(vId).value) || 0;
    const startTarget = parseFloat(document.getElementById('mp-target').value) || 2.00;
    const minTarget = parseFloat(document.getElementById('mp-target-min').value) || 1.01;
    const maxTarget = parseFloat(document.getElementById('mp-target-max').value) || 1000000;

    if (action === 'none') {
      // no change
    } else if (action === 'reset') {
      currentTarget = startTarget;
    } else if (action === 'increase') {
      currentTarget += val;
    } else if (action === 'decrease') {
      currentTarget -= val;
    }

    currentTarget = Math.max(minTarget, Math.min(maxTarget, currentTarget));
    currentTarget = parseFloat(currentTarget.toFixed(2));

    const display = document.getElementById('mp-target-current');
    if (display) display.textContent = currentTarget.toFixed(2) + 'x';
  }

  // ── Stop condition check ──
  function shouldStop() {
    const net = stats.totalReturned - stats.totalWagered;
    const total = parseFloat(document.getElementById('mp-total').value) || 0;
    const maxGames = parseInt(document.getElementById('mp-games-max').value) || Infinity;

    if (stats.gamesPlayed >= maxGames) {
      updateStatus(`Stopped: reached ${maxGames} games`);
      return true;
    }
    if (total > 0 && stats.totalWagered >= total) {
      updateStatus(`Stopped: budget (${total.toFixed(2)}) exhausted`);
      return true;
    }

    const gv = parseFloat(document.getElementById('mp-stop-gain').value);
    if (!isNaN(gv) && gv > 0) {
      const gt = document.getElementById('mp-stop-gain-type').value;
      if (gt === 'fixed' && net >= gv) { updateStatus(`Stopped: gain $${gv} reached`); return true; }
      if (gt === 'percent' && startingBalance > 0 && (net / startingBalance) * 100 >= gv) {
        updateStatus(`Stopped: gain ${gv}% reached`); return true;
      }
    }

    const lv = parseFloat(document.getElementById('mp-stop-loss').value);
    if (!isNaN(lv) && lv > 0) {
      const lt = document.getElementById('mp-stop-loss-type').value;
      if (lt === 'fixed' && net <= -lv) { updateStatus(`Stopped: loss limit $${lv} hit`); return true; }
      if (lt === 'percent' && startingBalance > 0 && net < 0 && (Math.abs(net) / startingBalance) * 100 >= lv) {
        updateStatus(`Stopped: loss limit ${lv}% hit`); return true;
      }
    }

    const remaining = total > 0 ? total - stats.totalWagered : Infinity;
    if (total > 0 && currentBetAmount > remaining) {
      const minBet = parseFloat(document.getElementById('mp-bet-min').value) || 0.2;
      if (remaining >= minBet) {
        currentBetAmount = parseFloat(remaining.toFixed(2));
      } else {
        updateStatus('Stopped: remaining budget below min bet');
        return true;
      }
    }

    return false;
  }

  // ── Core game loop ──
  async function playOneGame() {
    const targetMode = document.getElementById('mp-target-mode')?.value;
    const target = targetMode === 'dynamic'
      ? currentTarget
      : (parseFloat(document.getElementById('mp-target')?.value) || 2.00);
    const chance = targetToChance(target);

    addLog(`Bet ${currentBetAmount.toFixed(2)} | target ${target.toFixed(2)}x | ${chance.toFixed(2)}% chance`, 'rgba(255,249,240,0.55)');
    updateStatus(`Betting ${currentBetAmount.toFixed(2)} @ ${target.toFixed(2)}x...`);

    let result;
    try {
      result = await placeBet(currentBetAmount, target);
    } catch (e) {
      addLog(`Bet failed: ${e.message}`, '#FF00FF');
      updateStatus(`Bet failed: ${e.message}`);
      return null;
    }

    stats.totalWagered += currentBetAmount;
    stats.gamesPlayed++;

    const lb = result?.limboBet || result?.data?.limboBet || result?.data || result;
    if (!lb || !lb.state || typeof lb.state.result !== 'number') {
      addLog(`Bad response shape — keys: ${Object.keys(result || {}).join(',')}`, '#FF3399');
      try { console.warn('[K4D] bet returned:', JSON.stringify(result, null, 2)); } catch (_) {}
      updateStatus('Unexpected API response — see console');
      return null;
    }

    const roll = lb.state.result;
    const payoutMult = lb.payoutMultiplier || 0;
    const payout = lb.payout || 0;
    const won = payoutMult > 0;
    lastRoll = roll;
    lastResult = won ? 'WIN' : 'LOSS';

    if (won) {
      stats.totalReturned += payout;
      stats.wins++;
      addLog(`Rolled ${roll.toFixed(2)}x ≥ ${target.toFixed(2)}x → WIN +${payout.toFixed(2)} (${payoutMult.toFixed(2)}x)`, '#00E5FF');
    } else {
      stats.losses++;
      addLog(`Rolled ${roll.toFixed(2)}x < ${target.toFixed(2)}x → LOSS -${currentBetAmount.toFixed(2)}`, '#FF00FF');
    }

    return { won, payout, roll };
  }

  async function startAutoPlay() {
    // Last-chance auto-resolve — these are idempotent and cheap.
    if (!authHeaders['x-access-token']) await readAccessTokenFromCookie();
    if (!authHeaders['x-lockdown-token']) await readLockdownTokenFromBundle();
    if (!authHeaders['x-access-token']) {
      updateStatus('No session cookie — please log into Stake.us and reload.');
      return;
    }
    if (!authHeaders['x-lockdown-token']) {
      updateStatus('Could not extract lockdown token from bundle — reload the page.');
      return;
    }

    isRunning = true;
    stopRequested = false;
    stats = { gamesPlayed: 0, wins: 0, losses: 0, totalWagered: 0, totalReturned: 0 };
    startingBalance = getBalance();
    currentBetAmount = clampBet(document.getElementById('mp-bet-start'), { flash: false });
    currentTarget = parseFloat(document.getElementById('mp-target')?.value) || 2.00;
    consecutiveWins = 0;
    consecutiveLosses = 0;
    lastRoll = null;
    lastResult = null;
    const tgtDisp = document.getElementById('mp-target-current');
    if (tgtDisp) tgtDisp.textContent = currentTarget.toFixed(2) + 'x';

    const btn = document.getElementById('mp-play');
    btn.textContent = 'STOP';
    btn.className = 'play-btn play-stop';

    addLog('=== Session started ===', '#00E5FF');
    addLog(`Balance: ${startingBalance.toFixed(2)} | Strategy: ${selectedStrategy}`, 'rgba(255,249,240,0.35)');
    updateStatus('Running...');
    updateStats();

    while (!stopRequested) {
      if (shouldStop()) break;

      const result = await playOneGame();
      if (result === null) {
        currentIdentifier = null;
        await sleep(jitter(4000, 3000));
        continue;
      }

      const prevBet = currentBetAmount;
      if (result.won) {
        consecutiveWins++;
        consecutiveLosses = 0;
      } else {
        consecutiveLosses++;
        consecutiveWins = 0;
      }
      adjustBet(result.won);
      adjustTarget(result.won);
      updateStats();

      const targetInfo = document.getElementById('mp-target-mode')?.value === 'dynamic'
        ? ` | tgt: ${currentTarget.toFixed(2)}x` : '';
      if (result.won) {
        updateStatus(`#${stats.gamesPlayed} WIN +${result.payout.toFixed(2)} → bet: ${currentBetAmount.toFixed(2)}${targetInfo}`);
      } else {
        updateStatus(`#${stats.gamesPlayed} LOSS -${prevBet.toFixed(2)} → bet: ${currentBetAmount.toFixed(2)}${targetInfo}`);
      }

      await sleep(jitter(800, 1500));
      await humanPause();
    }

    isRunning = false;
    const btn2 = document.getElementById('mp-play');
    btn2.textContent = 'START AUTO PLAY';
    btn2.className = 'play-btn play-go';

    const net = stats.totalReturned - stats.totalWagered;
    const summary = `Done! ${stats.gamesPlayed} games | W:${stats.wins} L:${stats.losses} | Net: ${net >= 0 ? '+' : ''}${net.toFixed(2)}`;
    addLog('=== ' + summary + ' ===', net >= 0 ? '#00E5FF' : '#FF00FF');
    updateStatus(summary);
  }

  // ── Init ──
  function init() {
    const existing = document.getElementById('k4d-auto');
    if (existing) {
      if (existing.dataset.game === 'limbo') return;
      existing.remove();
    }
    createPanel();
    applyPreset();
    updateChanceDisplay();
    // Auth resolution is fired at module load (see readAccessTokenFromCookie /
    // readLockdownTokenFromBundle IIFE above). Nothing else needed here.
  }

  const tryInit = () => {
    if (location.pathname.startsWith('/casino/games/limbo')) init();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
  setInterval(tryInit, 2000);
})();
