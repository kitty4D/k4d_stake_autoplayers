// ==UserScript==
// @name         K4D :: TREAT ME LIKE A PIRATE, GIMME DAT BOOTY
// @namespace    http://tampermonkey.net/
// @version      2.6
// @author       K4D
// @description  Floating overlay that dumps queryable User properties from Stake.us GraphQL — three tabs (General / Balances / Flags). Unobfuscated source — read every line before you run it.
// @match        https://stake.us/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const K4D_LOGO = 'data:image/png;base64,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';

  // ─────────────────────────────────────────────────────────────────────────
  // GraphQL — User scalar fields (excludes dob, email, phoneNumber, phoneCountryCode
  // for privacy; excludes 3 fields with required args).
  // ─────────────────────────────────────────────────────────────────────────
  const USER_SCALARS = [
    "activeRacingBetCount","activeSportBetCount","activeSportsbookXMultiBetCount","activeSwishBetCount",
    "affiliateDealType","affiliatesAnalyticsAccess","breezeEarlyAccess","campaignSet",
    "createdAt","credentialsUpdatedAt","currentSessionStartedAt","depositLimitAccess",
    "fiatDepositCount","fiatWithdrawalCount","gameGroupFollowingCount",
    "geocomplyVerified","hasEmailSubscribed","hasEmailVerified","hasExistingGiftEmailCode",
    "hasExistingRainEmailCode","hasExistingTipEmailCode","hasOauth","hasPassword","hasPhoneNumberVerified",
    "hasReferralSource","hasSwapCryptoWithSwappedEarlyAccess","hasTfaEnabled","id","intercomHash",
    "intercomJwt","isBanned","isBetaSport","isCompromised","isEnhancedDueDiligence",
    "isEnhancedDueDiligenceFrozen","isFiatSuspended","isFiatWithdrawOnly","isHighroller","isIgnored",
    "isIpRestricted","isKycBasicRequired","isKycBypassed","isKycExtendedRequired","isKycFullRequired",
    "isKycUltimateRequired","isMaxBetEnabled","isMuted","isOfficial","isOnline","isPacksCollected",
    "isRainproof","isReferred","isSamuraiSlotsBeta","isSoftswissBeta","isSportHighroller",
    "isSportsbookExcluded","isSuspended","isSuspendedSportsbook","isTfaSessionValid","isUserOffboarded",
    "kycBundleEarlyAccess","lastLoginAt","lastRacePosition","leaderboardDailyProfitRank",
    "leaderboardDailyWageredRank","leaderboardWeeklyProfitRank","leaderboardWeeklyWageredRank",
    "meshEarlyAccess","messageCount","moonpayEarlyAccess","name","nextPostcardCodeAvailableAt","ngr",
    "notificationCount","oauthProvider","offboardControlAccess",
    "preferenceHideBets","registeredWithVpn","restricted","swappedConnectEarlyAccess",
    "swappedEarlyAccess","tfaSessionExpireAt","updatedAt","vipModalEarlyAccess",
  ];

  // Object subqueries. `profile` removed (contains address/phone). Auto-recovers on permission errors.
  const USER_OBJECTS = {
    currentPlaySession:  { selection: "createdAt expireAt finalBalance fitToPlay id initBalance profit totalWagered updatedAt" },
    balances:            { selection: "available { amount currency value } bonus { amount currency value } deposit { amount currency value } bet { amount currency value }" },
    rakeback:            { selection: "createdAt enabled id rate updatedAt" },
    addedRoleList:       { selection: "createdAt expireAt isTemporary message" },
    community:           { selection: "emoji isRainProof lastRain messageCount status" },
    dailyTotalDeposited: { selection: "dailyDepositedValue limit servertime" },
    preference:          { selection: "hideBets hideRaceStats hideWagered noBetConfirmation singleBetSlipDisplayFirst smsOptOut" },
    permissionFlags:     { selection: "value modify createdAt updatedAt permission { name }" },
    permissionLimits:    { selection: "value available modify createdAt updatedAt permission { name }" },
    flags:               { selection: "createdAt flag rank" },
    flagProgress:        { selection: "flag progress" },
  };

  // Sibling root queries (not sub-fields of `user`). Auto-recovers individually
  // if any are permission-gated — they just drop out of the result silently.
  const EXTRA_QUERIES = {
    userBonusUnclaimedList:                      { args: "(limit: 25, offset: 0)", selection: "amount claimedAt currency ip redeemed value" },
    getVipProgressWagerMultiplierByGameScopes:   { selection: "id value condition { name value }" },
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Tab layout — each tab pulls specific scalar fields + nested object renderers
  // ─────────────────────────────────────────────────────────────────────────
  const IDENTITY_FIELDS = ['id','name','createdAt','credentialsUpdatedAt','updatedAt','lastLoginAt','currentSessionStartedAt','oauthProvider','hasOauth','hasPassword','hasTfaEnabled','tfaSessionExpireAt','isTfaSessionValid','intercomHash','intercomJwt'];
  const COUNT_FIELDS    = ['messageCount','notificationCount','activeRacingBetCount','activeSportBetCount','activeSportsbookXMultiBetCount','activeSwishBetCount','gameGroupFollowingCount','fiatDepositCount','fiatWithdrawalCount','lastRacePosition'];
  const LEADERBOARD_FIELDS = ['leaderboardDailyProfitRank','leaderboardDailyWageredRank','leaderboardWeeklyProfitRank','leaderboardWeeklyWageredRank'];
  const ACCOUNT_FLAG_FIELDS = ['isBanned','isCompromised','isSuspended','isSuspendedSportsbook','isFiatSuspended','isFiatWithdrawOnly','isHighroller','isIgnored','isIpRestricted','isMuted','isOfficial','isOnline','isPacksCollected','isRainproof','isReferred','isUserOffboarded','restricted','registeredWithVpn','geocomplyVerified','hasEmailVerified','hasEmailSubscribed','hasPhoneNumberVerified','hasReferralSource','isBetaSport','isSportHighroller','isSportsbookExcluded','isMaxBetEnabled','isEnhancedDueDiligence','isEnhancedDueDiligenceFrozen'];
  const KYC_FIELDS = ['isKycBasicRequired','isKycBypassed','isKycExtendedRequired','isKycFullRequired','isKycUltimateRequired'];
  const BETA_FIELDS = ['breezeEarlyAccess','kycBundleEarlyAccess','meshEarlyAccess','moonpayEarlyAccess','swappedEarlyAccess','swappedConnectEarlyAccess','hasSwapCryptoWithSwappedEarlyAccess','isSamuraiSlotsBeta','isSoftswissBeta','vipModalEarlyAccess'];
  const MISC_FLAG_FIELDS = ['affiliateDealType','affiliatesAnalyticsAccess','campaignSet','depositLimitAccess','offboardControlAccess','preferenceHideBets','hasExistingGiftEmailCode','hasExistingRainEmailCode','hasExistingTipEmailCode','nextPostcardCodeAvailableAt','ngr'];

  // ─────────────────────────────────────────────────────────────────────────
  // Auth — reads session cookie + scrapes lockdown token (2-pass fallback)
  // ─────────────────────────────────────────────────────────────────────────
  let authHeaders = {};
  const origFetch = window.fetch.bind(window);

  // ─── fetch interceptor ───────────────────────────────────────────────────
  // Stake's own code makes constant GraphQL calls (balance, chat, online
  // count, etc.). Each one carries x-access-token + x-lockdown-token. We
  // snoop the headers on the way out — no bundle scraping needed.
  // This is by far the most reliable way to get the lockdown token: the
  // bundle that defines it isn't always preloaded on the current route, but
  // Stake's own code definitely has it the moment any auth'd request fires.
  window.fetch = function(input, init) {
    try {
      const h = init && init.headers;
      if (h) {
        const get = (k) => {
          if (h instanceof Headers) return h.get(k);
          return h[k] ?? h[k.toLowerCase()] ?? h[k.toUpperCase()] ?? null;
        };
        const lock = get('x-lockdown-token');
        const acc  = get('x-access-token');
        if (lock && !authHeaders['x-lockdown-token']) authHeaders['x-lockdown-token'] = lock;
        if (acc  && !authHeaders['x-access-token'])  authHeaders['x-access-token']  = acc;
      }
    } catch (_) {}
    return origFetch(input, init);
  };

  const RE_LOCKDOWN = /\bconst\s+[A-Za-z_$]\s*=\s*"([A-Za-z0-9]{16,32})"\s*;/;

  async function readAccessToken() {
    if (authHeaders['x-access-token']) return;
    try {
      const c = await cookieStore.get('session');
      if (c?.value) authHeaders['x-access-token'] = c.value;
    } catch (_) {}
  }

  async function scanCandidates(candidates) {
    for (let i = 0; i < candidates.length; i += 12) {
      const batch = candidates.slice(i, i + 12);
      const results = await Promise.all(batch.map(u =>
        origFetch(u, { credentials: 'omit' }).then(r => r.ok ? r.text() : null).catch(() => null)
      ));
      for (const t of results) {
        // Relaxed from 4000 → 50000 so we catch bundles that grew with
        // additional helpers but still contain the small lockdown const.
        if (!t || t.length > 50000) continue;
        const m = t.match(RE_LOCKDOWN);
        if (m) return m[1];
      }
    }
    return null;
  }

  async function readLockdownToken() {
    if (authHeaders['x-lockdown-token']) return;
    const seen = new Set();
    const local = [
      ...[...document.querySelectorAll('link[rel="modulepreload"]')].map(l => l.href),
      ...[...document.querySelectorAll('script[src]')].map(s => s.src),
      ...performance.getEntriesByType('resource').map(e => e.name).filter(u => /\.js(\?|$)/i.test(u)),
    ].filter(u => u && /\/_app\/immutable\/(chunks|nodes)\//.test(u) && !seen.has(u) && seen.add(u));
    let tok = await scanCandidates(local);
    if (tok) { authHeaders['x-lockdown-token'] = tok; return; }
    try {
      const html = await origFetch('/casino/games/plinko', { credentials: 'omit' })
        .then(r => r.ok ? r.text() : '').catch(() => '');
      const remote = [...html.matchAll(/href="(\/_app\/immutable\/(?:chunks|nodes)\/[^"]+\.js)"/g)].map(m => new URL(m[1], location.origin).href);
      tok = await scanCandidates(remote);
      if (tok) { authHeaders['x-lockdown-token'] = tok; return; }
    } catch (_) {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // GraphQL query with auto-recover on permission/validation errors
  // Also fetches the system-wide role taxonomy via `info.roles` (InfoRole type).
  // ─────────────────────────────────────────────────────────────────────────
  function buildQuery(scalars, objects, extras) {
    const objBlocks = Object.entries(objects).map(([n, s]) => `${n}${s.args || ''} { ${s.selection} }`).join(' ');
    const extraBlocks = Object.entries(extras).map(([n, s]) => `${n}${s.args || ''} { ${s.selection} }`).join(' ');
    return `query SpelunkUser($id: String) {
      user(userId: $id) { ${scalars.join(' ')} ${objBlocks} }
      info { roles { name include exclude modify } }
      ${extraBlocks}
    }`;
  }
  function extractBadField(err) {
    // Prefer subfield (path[1]); fall back to root field (path[0]) so we can
    // drop top-level sibling queries that error individually.
    if (Array.isArray(err.path) && err.path.length) {
      return err.path[1] || err.path[0] || null;
    }
    const m = (err.message || '').match(/Field\s+"([^"]+)"/);
    return m ? m[1] : null;
  }
  async function executeQuery(userId) {
    let scalars = [...USER_SCALARS];
    let objects = { ...USER_OBJECTS };
    let extras  = { ...EXTRA_QUERIES };
    const skipped = new Set();
    let lastJson = null;
    for (let attempt = 0; attempt < 12; attempt++) {
      const resp = await origFetch('/_api/graphql', {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ query: buildQuery(scalars, objects, extras), variables: { id: userId } }),
      });
      const json = await resp.json();
      lastJson = json;
      if (json.data?.user) {
        const extrasOut = {};
        for (const k of Object.keys(extras)) extrasOut[k] = json.data[k] ?? null;
        return {
          user: json.data.user,
          roles: json.data.info?.roles || [],
          extras: extrasOut,
          skipped: [...skipped],
          errors: json.errors || [],
        };
      }
      const bad = new Set((json.errors || []).map(extractBadField).filter(Boolean));
      if (!bad.size) break;
      bad.forEach(p => skipped.add(p));
      scalars = scalars.filter(n => !bad.has(n));
      for (const k of Object.keys(objects)) if (bad.has(k)) delete objects[k];
      for (const k of Object.keys(extras))  if (bad.has(k)) delete extras[k];
    }
    return { user: null, roles: [], extras: {}, skipped: [...skipped], errors: lastJson?.errors || [] };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Rendering helpers
  // ─────────────────────────────────────────────────────────────────────────
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  function fmtDate(d) { if (!d) return null; const dt = new Date(d); return isNaN(dt) ? d : dt.toISOString().slice(0,10) + ' ' + dt.toISOString().slice(11,16); }
  function fmtVal(v) {
    if (v === null || v === undefined) return '<span class="v null">null</span>';
    if (typeof v === 'boolean') return `<span class="v bool ${v ? 'true':'false'}">${v}</span>`;
    if (typeof v === 'number') return `<span class="v num">${v.toLocaleString()}</span>`;
    if (typeof v === 'string') {
      if (/^[A-Z][a-z]{2}, \d{1,2} [A-Z][a-z]{2} \d{4}/.test(v)) return `<span class="v date">${fmtDate(v)}</span>`;
      const t = v.length > 120 ? v.slice(0, 120) + '…' : v;
      return `<span class="v str">${esc(t)}</span>`;
    }
    return `<span class="v obj">${esc(JSON.stringify(v))}</span>`;
  }
  function rows(user, fields) {
    return fields.filter(f => f in user).map(f =>
      `<div class="row"><div class="k">${f}</div><div>${fmtVal(user[f])}</div></div>`
    ).join('');
  }
  function section(title, body) {
    if (!body || !body.trim()) return '';
    return `<div class="grp"><div class="grp-title">${esc(title)}</div>${body}</div>`;
  }

  // Pretty key-value renderer for nested objects (rather than raw JSON)
  function kvBlock(obj) {
    if (!obj || typeof obj !== 'object') return '';
    return Object.entries(obj).map(([k, v]) => {
      const valHtml = (v && typeof v === 'object')
        ? `<pre class="v-nested">${esc(JSON.stringify(v, null, 2))}</pre>`
        : fmtVal(v);
      return `<div class="row"><div class="k">${esc(k)}</div><div>${valHtml}</div></div>`;
    }).join('');
  }

  function renderRank(flags, flagProgress) {
    if (!flags && !flagProgress) return '';
    const sorted = (flags || []).slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const earned = sorted.map(f =>
      `<div class="row"><div class="k">${esc(f.flag)}</div><div><span class="v str">rank ${f.rank ?? '—'}</span> <span class="v date">${fmtDate(f.createdAt) || ''}</span></div></div>`
    ).join('');
    const prog = flagProgress
      ? `<div class="row"><div class="k">in progress</div><div><span class="v str">${esc(flagProgress.flag)}</span> <span class="v num">${(flagProgress.progress * 100).toFixed(1)}%</span></div></div>`
      : '';
    return earned + prog;
  }

  function renderBalances(balances) {
    if (!Array.isArray(balances)) return '';
    const nonZero = balances.filter(b => b && Object.values(b).some(x => x && typeof x === 'object' && (x.amount || x.value)));
    if (!nonZero.length) return '<div class="row"><div class="k">balances</div><div><span class="v null">all zero</span></div></div>';
    return nonZero.map(b => {
      const cur = b.available?.currency || b.bonus?.currency || b.deposit?.currency || b.bet?.currency || '?';
      return `
        <div class="row obj-row">
          <div class="k currency">${esc(cur)}</div>
          <div class="bal-grid">
            <div><span class="bal-label">avail</span> <span class="v num">${(b.available?.amount || 0).toLocaleString()}</span></div>
            <div><span class="bal-label">bonus</span> <span class="v num">${(b.bonus?.amount || 0).toLocaleString()}</span></div>
            <div><span class="bal-label">deposit</span> <span class="v num">${(b.deposit?.amount || 0).toLocaleString()}</span></div>
            <div><span class="bal-label">wagered</span> <span class="v num">${(b.bet?.amount || 0).toLocaleString()}</span></div>
          </div>
        </div>`;
    }).join('');
  }

  function renderPermissionFlags(arr) {
    if (!Array.isArray(arr) || !arr.length) return '';
    return arr.slice().sort((a, b) => (a.permission?.name || '').localeCompare(b.permission?.name || ''))
      .map(p => `<div class="row"><div class="k">${esc(p.permission?.name || '(unnamed)')}</div><div>${fmtVal(p.value)}${p.modify ? ' <span class="v str">(modifiable)</span>' : ''}</div></div>`)
      .join('');
  }

  // Render the system-wide role taxonomy from the perspective of the current
  // user. For each role we compute whether the user is:
  //   - ASSIGNED  — role name is in addedRoleList (directly granted)
  //   - INHERITED — transitively reachable via the `include` graph starting
  //                  from an assigned role (assigned → r.include[*] → r.include[*]…)
  //   - BLOCKED   — appears in the `exclude` list of a role the user has
  //                  (assigned OR inherited)
  //   - (nothing) — the user has no relationship to this role
  function computeUserRoleState(roles, userRoles) {
    const byName = Object.fromEntries(roles.map(r => [r.name, r]));
    const assigned = new Set((userRoles || []).map(r => (r.message || '').trim()).filter(Boolean));

    // Transitive closure over .include
    const reachable = new Set(assigned);
    const queue = [...assigned];
    while (queue.length) {
      const n = queue.shift();
      const r = byName[n];
      if (!r) continue;
      for (const inc of (r.include || [])) {
        if (!reachable.has(inc)) { reachable.add(inc); queue.push(inc); }
      }
    }
    const inherited = new Set([...reachable].filter(n => !assigned.has(n)));

    // Anything excluded by a role the user has (directly or via inherit)
    const excluded = new Set();
    for (const n of reachable) {
      const r = byName[n];
      if (!r) continue;
      for (const exc of (r.exclude || [])) excluded.add(exc);
    }
    // Don't double-flag a role as both inherited and excluded — assigned/inherited wins
    for (const n of reachable) excluded.delete(n);

    return { assigned, inherited, excluded };
  }

  function renderRoleTaxonomy(roles, userRoles) {
    if (!Array.isArray(roles) || !roles.length) return '';
    const { assigned, inherited, excluded } = computeUserRoleState(roles, userRoles);

    const stateFor = (name) => {
      if (assigned.has(name))  return { key: 'assigned',  label: 'ASSIGNED',  rank: 0 };
      if (inherited.has(name)) return { key: 'inherited', label: 'INHERITED', rank: 1 };
      if (excluded.has(name))  return { key: 'excluded',  label: 'BLOCKED',   rank: 2 };
      return { key: 'neutral', label: '', rank: 3 };
    };

    const sorted = roles.slice().sort((a, b) => {
      const sa = stateFor(a.name).rank, sb = stateFor(b.name).rank;
      return sa - sb || a.name.localeCompare(b.name);
    });

    const rowFor = r => {
      const s = stateFor(r.name);
      const badge = s.label ? `<span class="role-tag state-${s.key}">${s.label}</span>` : '';
      const meta = [];
      if (r.include?.length) meta.push(`+${r.include.length}`);
      if (r.exclude?.length) meta.push(`-${r.exclude.length}`);
      const metaStr = meta.length ? `<span class="role-meta">${meta.join(' · ')}</span>` : '';
      const hasDetail = r.include?.length || r.exclude?.length || r.modify?.length;
      const details = hasDetail ? `
        <div class="role-detail">
          ${r.include?.length ? `<div><span class="role-detail-label">grants:</span> ${esc(r.include.join(', '))}</div>` : ''}
          ${r.exclude?.length ? `<div><span class="role-detail-label">blocks:</span> ${esc(r.exclude.join(', '))}</div>` : ''}
          ${r.modify?.length  ? `<div><span class="role-detail-label">can modify:</span> ${esc(r.modify.join(', '))}</div>` : ''}
        </div>` : '';
      return `
        <details class="role-row role-state-${s.key}">
          <summary>
            <span class="role-name">${esc(r.name)}</span>
            ${badge}
            ${metaStr}
          </summary>
          ${details}
        </details>`;
    };

    // Summary header showing the actual counts
    const summary = `<div class="role-summary">
      <span class="role-count assigned">${assigned.size} assigned</span>
      <span class="role-count inherited">${inherited.size} inherited</span>
      <span class="role-count excluded">${excluded.size} blocked</span>
      <span class="role-count neutral">${roles.length - assigned.size - inherited.size - excluded.size} other</span>
    </div>`;

    return summary + sorted.map(rowFor).join('');
  }

  // Unclaimed bonuses block (BonusClaim[])
  function renderUnclaimedBonuses(list) {
    if (!Array.isArray(list)) return '';
    if (!list.length) return '<div class="row"><div class="k">—</div><div><span class="v null">none</span></div></div>';
    return list.map(b =>
      `<div class="row"><div class="k">${esc(b.currency || '?')}</div><div>` +
      `<span class="v num">${(b.amount || 0).toLocaleString()}</span>` +
      (b.claimedAt ? ` <span class="v date">${fmtDate(b.claimedAt)}</span>` : '') +
      (b.redeemed ? ' <span class="v str">(redeemed)</span>' : '') +
      `</div></div>`
    ).join('');
  }

  // VIP progress wager multipliers grouped by game scope
  function renderVipWagerMultipliers(list) {
    if (!Array.isArray(list) || !list.length) return '';
    return list
      .slice()
      .sort((a, b) => (a.condition?.value || '').localeCompare(b.condition?.value || ''))
      .map(m => {
        const cond = m.condition?.value || '?';
        return `<div class="row"><div class="k">${esc(cond)}</div><div><span class="v num">${m.value}x</span></div></div>`;
      }).join('');
  }

  function renderTab(tab, user, roles, extras) {
    if (!user) return '<div class="empty">no data</div>';
    extras = extras || {};
    if (tab === 'general') {
      return section('Identity', rows(user, IDENTITY_FIELDS))
        + section('Rank', renderRank(user.flags, user.flagProgress))
        + section('Counts', rows(user, COUNT_FIELDS));
    }
    if (tab === 'balances') {
      let html = '';
      if (user.currentPlaySession) html += section('Current play session', kvBlock(user.currentPlaySession));
      html += section('Balances', renderBalances(user.balances));
      if (user.dailyTotalDeposited) html += section('Daily total deposited', kvBlock(user.dailyTotalDeposited));
      if (user.rakeback) html += section('Rakeback', kvBlock(user.rakeback));
      const ub = extras.userBonusUnclaimedList;
      if (Array.isArray(ub)) html += section(`Unclaimed bonuses (${ub.length})`, renderUnclaimedBonuses(ub));
      html += section('Leaderboards', rows(user, LEADERBOARD_FIELDS));
      return html;
    }
    if (tab === 'flags') {
      let html = '';
      html += section('Account flags', rows(user, ACCOUNT_FLAG_FIELDS));
      html += section('KYC', rows(user, KYC_FIELDS));
      html += section('Beta / early access', rows(user, BETA_FIELDS));
      html += section('Misc', rows(user, MISC_FLAG_FIELDS));
      if (user.community) html += section('Community', kvBlock(user.community));
      if (user.preference) html += section('Preferences', kvBlock(user.preference));
      if (user.addedRoleList) html += section('Added roles', user.addedRoleList.length ? user.addedRoleList.map(r => `<div class="row"><div class="k">${esc(r.message || '(no msg)')}</div><div><span class="v date">${fmtDate(r.createdAt) || ''}</span>${r.expireAt ? ' → ' + fmtDate(r.expireAt) : ''}${r.isTemporary ? ' <span class="v str">(temp)</span>' : ''}</div></div>`).join('') : '<div class="row"><div class="k">—</div><div><span class="v null">none</span></div></div>');
      html += section('Permission flags', renderPermissionFlags(user.permissionFlags));
      if (user.permissionLimits?.length) html += section('Permission limits', renderPermissionFlags(user.permissionLimits));
      const vipMult = extras.getVipProgressWagerMultiplierByGameScopes;
      if (Array.isArray(vipMult) && vipMult.length) html += section('VIP wager multipliers (site config)', renderVipWagerMultipliers(vipMult));
      html += section(`Site roles (${(roles || []).length})`, renderRoleTaxonomy(roles, user.addedRoleList));
      return html;
    }
    return '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Panel
  // ─────────────────────────────────────────────────────────────────────────
  const PANEL_ID = 'k4d-spelunker';
  let activeTab = 'general';

  function createPanel() {
    if (document.getElementById(PANEL_ID)) return;
    const panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Anybody:wght@400;700;900&family=Geist+Mono:wght@400;600&display=swap');
        #${PANEL_ID} {
          position: fixed; top: 60px; right: 10px; z-index: 99999;
          width: 460px; max-height: 92vh; overflow: hidden;
          background: #000; color: #FFF9F0;
          border: 1px solid rgba(0,229,255,0.2); border-radius: 14px;
          font-family: 'Geist Mono', monospace; font-size: 11px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.8), 0 0 32px rgba(0,229,255,0.06);
          display: flex; flex-direction: column;
        }
        #${PANEL_ID} * { box-sizing: border-box; }
        #${PANEL_ID} .hdr {
          background: radial-gradient(circle at 20% 0%, rgba(0,112,255,0.25), transparent 60%),
                      linear-gradient(135deg, #000 0%, #050818 100%);
          padding: 8px 12px 6px; border-radius: 13px 13px 0 0;
          cursor: move; display: flex; flex-direction: column; gap: 4px;
          border-bottom: 1px solid rgba(0,229,255,0.12);
        }
        #${PANEL_ID} .hdr-row1 {
          display: flex; align-items: center; gap: 8px;
        }
        #${PANEL_ID} .hdr-logo {
          width: 28px; height: auto; flex-shrink: 0;
          filter: drop-shadow(0 0 4px rgba(0,229,255,0.6)) drop-shadow(0 0 10px rgba(255,0,255,0.25));
        }
        #${PANEL_ID} h3 {
          margin: 0; font-family: 'Anybody', sans-serif;
          font-size: 11px; font-weight: 900;
          color: #00E5FF; letter-spacing: -0.4px; line-height: 1.1;
          text-shadow: 0 0 8px rgba(0,229,255,0.45);
          flex: 1 1 auto; min-width: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        #${PANEL_ID} .hdr-sub {
          font-size: 9px; color: rgba(255,249,240,0.45);
          padding-left: 36px; /* indent past the logo */
          display: flex; gap: 6px; align-items: center;
        }
        #${PANEL_ID} .hdr-sub a {
          color: #FF00FF; text-decoration: none;
          text-shadow: 0 0 4px rgba(255,0,255,0.3);
        }
        #${PANEL_ID} .hdr-sub a:hover { color: #FF3399; text-shadow: 0 0 8px rgba(255,51,153,0.6); }
        #${PANEL_ID} .hdr-btns { display: flex; gap: 4px; flex-shrink: 0; }
        #${PANEL_ID} .hdr-btns button {
          background: none; border: 1px solid rgba(0,229,255,0.3); color: rgba(255,249,240,0.7);
          font-family: 'Geist Mono', monospace; font-size: 11px; padding: 3px 8px;
          border-radius: 4px; cursor: pointer;
        }
        #${PANEL_ID} .hdr-btns button:hover { color: #00E5FF; border-color: #00E5FF; }
        #${PANEL_ID} .tabs {
          display: flex; border-bottom: 1px solid rgba(0,229,255,0.12);
        }
        #${PANEL_ID} .tab {
          flex: 1; padding: 8px 6px; background: none; border: none;
          color: rgba(255,249,240,0.5); cursor: pointer;
          font-family: 'Anybody', sans-serif; font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
          border-bottom: 2px solid transparent; transition: all 0.15s;
        }
        #${PANEL_ID} .tab:hover { color: #FFF9F0; }
        #${PANEL_ID} .tab.active {
          color: #00E5FF; border-bottom-color: #00E5FF;
          text-shadow: 0 0 6px rgba(0,229,255,0.35);
        }
        #${PANEL_ID} .status {
          padding: 5px 10px; font-size: 9px; color: rgba(255,249,240,0.5);
          background: rgba(0,229,255,0.04);
        }
        #${PANEL_ID} .body { overflow-y: auto; padding: 4px 10px 10px; flex: 1; }
        #${PANEL_ID} .body::-webkit-scrollbar { width: 4px; }
        #${PANEL_ID} .body::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.18); border-radius: 4px; }
        #${PANEL_ID} .grp { margin-top: 12px; }
        #${PANEL_ID} .grp-title {
          font-family: 'Anybody', sans-serif; font-size: 10px; font-weight: 700;
          color: #00E5FF; text-transform: uppercase; letter-spacing: 1.2px;
          margin-bottom: 4px; padding-bottom: 3px;
          border-bottom: 1px solid rgba(0,229,255,0.12);
          text-shadow: 0 0 6px rgba(0,229,255,0.3);
        }
        #${PANEL_ID} .row {
          display: grid; grid-template-columns: 160px 1fr; gap: 10px;
          padding: 2px 0; font-size: 10px; align-items: start;
        }
        #${PANEL_ID} .row .k {
          color: rgba(255,249,240,0.5);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        #${PANEL_ID} .v.null { color: rgba(255,249,240,0.25); font-style: italic; }
        #${PANEL_ID} .v.bool.true { color: #00E5FF; }
        #${PANEL_ID} .v.bool.false { color: #FF3399; }
        #${PANEL_ID} .v.num { color: #FFF9F0; font-weight: 600; }
        #${PANEL_ID} .v.date { color: #FF00FF; font-size: 9px; }
        #${PANEL_ID} .v.str { color: #FFF9F0; word-break: break-all; }
        #${PANEL_ID} .v.obj { color: rgba(255,249,240,0.7); font-size: 9px; word-break: break-all; }
        #${PANEL_ID} .v-nested {
          margin: 4px 0 0; padding: 6px 8px; background: rgba(0,229,255,0.04);
          border: 1px solid rgba(0,229,255,0.1); border-radius: 5px;
          font-size: 9px; color: #FFF9F0; max-height: 200px; overflow: auto;
        }
        #${PANEL_ID} .obj-row { display: grid; grid-template-columns: 80px 1fr; gap: 10px; padding: 4px 0; border-top: 1px dashed rgba(0,229,255,0.08); }
        #${PANEL_ID} .obj-row:first-child { border-top: 0; }
        #${PANEL_ID} .obj-row .currency {
          color: #FF00FF; font-weight: 700; text-shadow: 0 0 4px rgba(255,0,255,0.3);
          text-transform: uppercase;
        }
        #${PANEL_ID} .bal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 12px; font-size: 9px; }
        #${PANEL_ID} .bal-label { color: rgba(255,249,240,0.4); margin-right: 4px; }
        #${PANEL_ID} .empty { padding: 20px; text-align: center; color: rgba(255,249,240,0.4); }
        /* Role taxonomy */
        #${PANEL_ID} .role-row {
          padding: 3px 0; font-size: 10px; border-top: 1px dashed rgba(0,229,255,0.06);
        }
        #${PANEL_ID} .role-row:first-of-type { border-top: 0; }
        #${PANEL_ID} .role-row summary {
          cursor: pointer; list-style: none; display: flex; align-items: center; gap: 6px;
          padding: 2px 0;
        }
        #${PANEL_ID} .role-row summary::-webkit-details-marker { display: none; }
        #${PANEL_ID} .role-row summary::before { content: '▸'; color: rgba(0,229,255,0.4); font-size: 8px; }
        #${PANEL_ID} .role-row[open] summary::before { content: '▾'; color: #00E5FF; }
        #${PANEL_ID} .role-name {
          color: #FFF9F0; font-weight: 600; flex: 0 0 auto; min-width: 140px;
        }
        #${PANEL_ID} .role-state-assigned .role-name {
          color: #FF3399; text-shadow: 0 0 4px rgba(255,51,153,0.3);
        }
        #${PANEL_ID} .role-state-inherited .role-name { color: #00E5FF; }
        #${PANEL_ID} .role-state-excluded .role-name {
          color: rgba(255,249,240,0.4); text-decoration: line-through; text-decoration-color: rgba(255,0,255,0.4);
        }
        #${PANEL_ID} .role-state-neutral { opacity: 0.55; }
        #${PANEL_ID} .role-state-neutral .role-name { color: rgba(255,249,240,0.5); font-weight: 400; }
        #${PANEL_ID} .role-tag {
          font-size: 8px; padding: 1px 5px; border-radius: 3px; font-weight: 700;
          letter-spacing: 0.5px; flex-shrink: 0;
        }
        #${PANEL_ID} .role-tag.state-assigned {
          background: #FF3399; color: #000; box-shadow: 0 0 6px rgba(255,51,153,0.5);
        }
        #${PANEL_ID} .role-tag.state-inherited {
          background: rgba(0,229,255,0.18); color: #00E5FF;
          border: 1px solid rgba(0,229,255,0.4);
        }
        #${PANEL_ID} .role-tag.state-excluded {
          background: rgba(255,0,255,0.12); color: #FF00FF;
          border: 1px solid rgba(255,0,255,0.3);
        }
        #${PANEL_ID} .role-meta {
          font-size: 8px; color: rgba(255,249,240,0.3); margin-left: auto;
          font-family: 'Geist Mono', monospace;
        }
        #${PANEL_ID} .role-summary {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding: 4px 0 8px; font-size: 9px;
          border-bottom: 1px dashed rgba(0,229,255,0.08); margin-bottom: 4px;
        }
        #${PANEL_ID} .role-count {
          padding: 2px 6px; border-radius: 3px; font-weight: 600;
        }
        #${PANEL_ID} .role-count.assigned  { background: rgba(255,51,153,0.15); color: #FF3399; }
        #${PANEL_ID} .role-count.inherited { background: rgba(0,229,255,0.12); color: #00E5FF; }
        #${PANEL_ID} .role-count.excluded  { background: rgba(255,0,255,0.1); color: #FF00FF; }
        #${PANEL_ID} .role-count.neutral   { background: rgba(255,249,240,0.05); color: rgba(255,249,240,0.45); }
        #${PANEL_ID} .role-detail {
          padding: 4px 0 4px 14px; font-size: 9px; color: rgba(255,249,240,0.7);
          line-height: 1.5; word-break: break-word;
        }
        #${PANEL_ID} .role-detail-label {
          color: rgba(255,249,240,0.4); font-weight: 600; margin-right: 4px;
        }
      </style>
      <div class="hdr" id="k4d-drag">
        <div class="hdr-row1">
          <img class="hdr-logo" src="${K4D_LOGO}" alt="K4D" />
          <h3 title="K4D :: TREAT ME LIKE A PIRATE, GIMME DAT BOOTY">K4D :: TREAT ME LIKE A PIRATE, GIMME DAT BOOTY</h3>
          <div class="hdr-btns">
            <button id="k4d-refresh" title="Re-query">↻</button>
            <button id="k4d-copy" title="Copy raw JSON">⧉</button>
            <button id="k4d-close" title="Hide">×</button>
          </div>
        </div>
        <div class="hdr-sub">
          <a href="https://x.com/kitty4dhd" target="_blank">@kitty4dhd</a>
        </div>
      </div>
      <div class="tabs">
        <button class="tab active" data-tab="general">General</button>
        <button class="tab" data-tab="balances">Balances</button>
        <button class="tab" data-tab="flags">Flags</button>
      </div>
      <div class="status" id="k4d-status">Loading…</div>
      <div class="body" id="k4d-body"><div class="empty">Loading…</div></div>
    `;
    document.body.appendChild(panel);
    setupDrag(panel, document.getElementById('k4d-drag'));
    document.getElementById('k4d-close').addEventListener('click', () => panel.style.display = 'none');
    document.getElementById('k4d-refresh').addEventListener('click', loadAndRender);
    document.getElementById('k4d-copy').addEventListener('click', () => {
      if (window.__k4dUser) {
        navigator.clipboard.writeText(JSON.stringify(window.__k4dUser, null, 2));
        document.getElementById('k4d-status').textContent = 'Copied to clipboard.';
      }
    });
    document.querySelectorAll(`#${PANEL_ID} .tab`).forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        document.querySelectorAll(`#${PANEL_ID} .tab`).forEach(b => b.classList.toggle('active', b === btn));
        if (window.__k4dUser) document.getElementById('k4d-body').innerHTML = renderTab(activeTab, window.__k4dUser, window.__k4dRoles, window.__k4dExtras);
      });
    });
  }

  function setupDrag(el, handle) {
    let ox = 0, oy = 0, dragging = false;
    handle.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
      dragging = true;
      const r = el.getBoundingClientRect();
      ox = e.clientX - r.left; oy = e.clientY - r.top;
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

  // Wait until both auth tokens are present. Two converging strategies:
  //   1. fetch interceptor — every Stake GraphQL/REST call hands us the
  //      tokens for free (no scraping required).
  //   2. bundle scrape — kicked off immediately, retried on exponential
  //      backoff in case modulepreload tags or chunks weren't ready yet.
  // Whichever lands first wins. Both populate the shared `authHeaders`.
  let scrapeInFlight = null;
  function triggerScrape() {
    if (authHeaders['x-lockdown-token']) return;
    if (scrapeInFlight) return; // don't pile them up
    scrapeInFlight = readLockdownToken()
      .catch(() => {})
      .finally(() => { scrapeInFlight = null; });
  }

  async function waitForAuth(timeoutMs = 30000) {
    const t0 = Date.now();
    const statusEl = () => document.getElementById('k4d-status');
    // Schedule scrape attempts: 0s, 2s, 5s, 10s, 20s. After each completes
    // and still no token, the next slot opens.
    const scrapeSlots = [0, 2000, 5000, 10000, 20000];
    let nextSlot = 0;
    while (Date.now() - t0 < timeoutMs) {
      if (!authHeaders['x-access-token']) await readAccessToken();
      if (authHeaders['x-access-token'] && authHeaders['x-lockdown-token']) return true;

      const elapsed = Date.now() - t0;
      if (!authHeaders['x-lockdown-token'] && nextSlot < scrapeSlots.length && elapsed >= scrapeSlots[nextSlot]) {
        nextSlot++;
        triggerScrape(); // fire-and-forget; populates authHeaders on success
      }

      const s = statusEl();
      if (s) {
        const src = scrapeInFlight ? 'scraping' : 'listening for Stake requests';
        s.textContent = `Waiting for auth bundle… ${Math.floor(elapsed / 1000)}s · ${src}`;
      }
      await new Promise(r => setTimeout(r, 500));
    }
    return false;
  }

  async function loadAndRender() {
    const statusEl = document.getElementById('k4d-status');
    const bodyEl = document.getElementById('k4d-body');
    statusEl.textContent = 'Waiting for Stake auth bundle…';
    bodyEl.innerHTML = '<div class="empty">Waiting for Stake to fire its first authed request — usually < 5s.</div>';
    const ok = await waitForAuth(30000);
    if (!authHeaders['x-access-token']) {
      statusEl.textContent = 'No session cookie — log into stake.us and reload.';
      bodyEl.innerHTML = '<div class="empty">Not logged in.</div>';
      return;
    }
    if (!authHeaders['x-lockdown-token']) {
      statusEl.textContent = 'No lockdown token after 30s — interact with the page (open a game, refresh) then click ↻.';
      bodyEl.innerHTML = '<div class="empty">Lockdown token wasn\'t intercepted. Navigate to any game (Plinko, Limbo…) or refresh, then click the ↻ button.</div>';
      return;
    }
    const userId = window.userId || null;
    if (!userId) { statusEl.textContent = 'window.userId not found on this page.'; return; }
    statusEl.textContent = `Querying user(${userId.slice(0, 8)}…)…`;
    const t0 = performance.now();
    const result = await executeQuery(userId);
    const ms = (performance.now() - t0).toFixed(0);
    if (!result.user) {
      statusEl.textContent = `Query failed (${ms}ms) — ${result.errors.length} errors. See console.`;
      try { console.warn('[K4D] spelunker errors:', result.errors); } catch (_) {}
      return;
    }
    window.__k4dUser   = result.user;
    window.__k4dRoles  = result.roles;
    window.__k4dExtras = result.extras || {};

    const skippedNote = result.skipped.length ? ` · skipped ${result.skipped.length} (permission)` : '';
    const rolesNote = result.roles?.length ? ` · ${result.roles.length} roles` : '';
    statusEl.textContent = `${Object.keys(result.user).length} fields${rolesNote} · ${ms}ms${skippedNote}`;
    bodyEl.innerHTML = renderTab(activeTab, result.user, result.roles, result.extras);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Header trigger button — injected into Stake's top bar between search and
  // profile icons. Clicking it toggles the spelunker panel.
  // ─────────────────────────────────────────────────────────────────────────
  const TRIGGER_ID = 'k4d-trigger';
  // Cat face icon — from SVG Repo (https://www.svgrepo.com/show/522779/cat.svg)
  // CC Attribution license. Four paths: head silhouette with ears, two eye
  // pupils, and a small mouth smile. All fills swapped to currentColor so the
  // icon inherits Stake's adjacent icon color. viewBox is 0 0 24 24, matching
  // the cloned search button's SVG box.
  const CAT_ICON_SVG = `<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0196 14.9374C11.7284 14.9374 11.4307 14.9818 11.1784 15.0796C11.0546 15.1275 10.9032 15.2031 10.7699 15.3252C10.6361 15.4479 10.4632 15.6749 10.4632 15.9999C10.4632 16.3249 10.6361 16.5519 10.7699 16.6745C10.9032 16.7967 11.0546 16.8722 11.1784 16.9202C11.4307 17.018 11.7284 17.0624 12.0196 17.0624C12.3109 17.0624 12.6085 17.018 12.8609 16.9202C12.9846 16.8722 13.136 16.7967 13.2693 16.6745C13.4032 16.5519 13.5761 16.3249 13.5761 15.9999C13.5761 15.6749 13.4032 15.4479 13.2693 15.3252C13.136 15.2031 12.9846 15.1275 12.8609 15.0796C12.6085 14.9818 12.3109 14.9374 12.0196 14.9374Z" fill="currentColor"/><path d="M14.0365 12.6464C14.2015 12.38 14.5274 12.0625 15.0163 12.0625C15.5051 12.0625 15.831 12.38 15.996 12.6464C16.1681 12.9243 16.2501 13.2612 16.2501 13.5938C16.2501 13.9263 16.1681 14.2632 15.996 14.5411C15.831 14.8075 15.5051 15.125 15.0163 15.125C14.5274 15.125 14.2015 14.8075 14.0365 14.5411C13.8644 14.2632 13.7824 13.9263 13.7824 13.5938C13.7824 13.2612 13.8644 12.9243 14.0365 12.6464Z" fill="currentColor"/><path d="M9.01634 12.0625C8.52751 12.0625 8.20161 12.38 8.03658 12.6464C7.86445 12.9243 7.78247 13.2612 7.78247 13.5938C7.78247 13.9263 7.86445 14.2632 8.03658 14.5411C8.20161 14.8075 8.52751 15.125 9.01634 15.125C9.50518 15.125 9.83108 14.8075 9.9961 14.5411C10.1682 14.2632 10.2502 13.9263 10.2502 13.5938C10.2502 13.2612 10.1682 12.9243 9.9961 12.6464C9.83108 12.38 9.50518 12.0625 9.01634 12.0625Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.09485 4.25C5.48148 4.25 4.77463 4.42871 4.20882 4.91616C3.62226 5.4215 3.27004 6.18781 3.27004 7.1875V9.0625L3.27005 9.06545C3.2712 9.35941 3.3211 9.94757 3.4888 10.4392C3.54365 10.6001 3.63129 10.8134 3.77764 11.0058C3.49364 11.5688 3.35904 12.1495 3.29787 12.7095C3.2468 13.1771 3.24611 13.6679 3.25424 14.1211C2.5932 14.3507 1.90877 14.6349 1.5932 14.8387C1.24524 15.0634 1.14534 15.5277 1.37006 15.8756C1.59478 16.2236 2.05903 16.3235 2.40698 16.0988C2.5234 16.0236 2.86686 15.8664 3.31867 15.6939C3.38755 16.173 3.52716 16.6095 3.7221 17.0063C3.56621 17.1035 3.42847 17.1935 3.31889 17.2652C3.27694 17.2926 3.23912 17.3173 3.20599 17.3387C2.85803 17.5634 2.75813 18.0277 2.98285 18.3756C3.20757 18.7236 3.67182 18.8235 4.01978 18.5988C4.0609 18.5722 4.10473 18.5436 4.15098 18.5134C4.28216 18.4278 4.43287 18.3294 4.59701 18.2288C5.18653 18.8313 5.91865 19.2964 6.67916 19.6462C8.45998 20.4654 10.569 20.75 12.0001 20.75C13.4311 20.75 15.5402 20.4654 17.321 19.6462C18.0815 19.2964 18.8136 18.8313 19.4031 18.2288C19.5673 18.3294 19.718 18.4278 19.8491 18.5134C19.8954 18.5436 19.9392 18.5722 19.9803 18.5988C20.3283 18.8235 20.7925 18.7236 21.0173 18.3756C21.242 18.0277 21.1421 17.5634 20.7941 17.3387C20.761 17.3173 20.7232 17.2926 20.6812 17.2652C20.5716 17.1935 20.4339 17.1035 20.2781 17.0063C20.473 16.6095 20.6127 16.173 20.6815 15.6938C21.1335 15.8663 21.4771 16.0236 21.5936 16.0988C21.9415 16.3235 22.4058 16.2236 22.6305 15.8756C22.8552 15.5277 22.7553 15.0634 22.4074 14.8387C22.0917 14.6349 21.4071 14.3506 20.7459 14.121C20.7541 13.6678 20.7534 13.177 20.7023 12.7095C20.6412 12.1495 20.5065 11.5688 20.2225 11.0058C20.3689 10.8134 20.4565 10.6001 20.5114 10.4392C20.6791 9.94758 20.729 9.35941 20.7301 9.06545L20.7302 9.0625V7.18761C20.7302 6.18792 20.3779 5.42162 19.7914 4.91628C19.2256 4.42882 18.5187 4.25011 17.9054 4.25011C17.4969 4.25011 17.0744 4.40685 16.7337 4.56076C16.3726 4.72392 15.9952 4.9359 15.6558 5.13136C15.5828 5.17339 15.5119 5.21444 15.443 5.25432L15.441 5.25548C15.177 5.4084 14.9427 5.5441 14.7339 5.65167C14.6042 5.7185 14.5035 5.7643 14.4285 5.79206C14.3969 5.80377 14.3767 5.80966 14.3663 5.81242C14.1129 5.81102 13.9514 5.79033 13.7181 5.76044C13.6681 5.75403 13.6147 5.74719 13.5564 5.74003C13.2098 5.69743 12.7722 5.65636 12.0001 5.65636C11.228 5.65636 10.7905 5.69743 10.4438 5.74003C10.3855 5.74719 10.3322 5.75403 10.2821 5.76044C10.0489 5.79033 9.88738 5.81102 9.63388 5.81242C9.62352 5.80966 9.60332 5.80376 9.57174 5.79206C9.49678 5.7643 9.39604 5.71849 9.26633 5.65166C9.05755 5.54408 8.82331 5.40842 8.55926 5.25548C8.48975 5.21523 8.41818 5.17377 8.34446 5.13132C8.00502 4.93584 7.62764 4.72384 7.26652 4.56067C6.92587 4.40675 6.50329 4.25 6.09485 4.25ZM6.16192 17.6138C6.49595 17.8657 6.8808 18.0879 7.30604 18.2835C8.83694 18.9877 10.7179 19.25 12.0001 19.25C13.2823 19.25 15.1632 18.9877 16.6941 18.2835C17.1194 18.0879 17.5042 17.8657 17.8382 17.6138C17.4858 17.5524 17.2179 17.245 17.2179 16.875C17.2179 16.4608 17.5537 16.125 17.9679 16.125C18.2951 16.125 18.6295 16.2068 18.9399 16.3204C19.0985 15.9885 19.1959 15.625 19.2226 15.2271C18.9249 15.1544 18.7193 15.125 18.6134 15.125C18.1992 15.125 17.8634 14.7892 17.8634 14.375C17.8634 13.9608 18.1992 13.625 18.6134 13.625C18.8081 13.625 19.0284 13.6542 19.2504 13.6974C19.2505 13.4213 19.2415 13.1502 19.2112 12.8724C19.1407 12.227 18.958 11.6541 18.5269 11.1447C18.3727 10.9625 18.1809 10.7813 17.9402 10.6045C17.6063 10.3594 17.5344 9.88999 17.7796 9.55611C18.0247 9.22224 18.4941 9.15031 18.828 9.39546C18.9471 9.48292 19.0597 9.57282 19.1659 9.66506C19.2099 9.43686 19.2295 9.19817 19.2302 9.06087V7.18761C19.2302 6.56231 19.0238 6.23486 18.8123 6.0527C18.5801 5.85266 18.2496 5.75011 17.9054 5.75011C17.835 5.75011 17.659 5.78868 17.3513 5.92771C17.064 6.0575 16.7432 6.23612 16.4043 6.43125C16.3407 6.4679 16.2759 6.50544 16.2106 6.54328C15.9428 6.69843 15.666 6.85883 15.4209 6.98509C15.2663 7.06473 15.1052 7.14099 14.9495 7.19867C14.8058 7.25192 14.607 7.3125 14.3941 7.3125C14.0223 7.3125 13.7617 7.27877 13.5115 7.2464C13.4654 7.24043 13.4196 7.23449 13.3735 7.22883C13.0848 7.19336 12.7084 7.15636 12.0001 7.15636C11.2919 7.15636 10.9154 7.19336 10.6267 7.22883C10.5807 7.23449 10.5349 7.24042 10.4887 7.24639C10.2386 7.27877 9.97796 7.3125 9.6061 7.3125C9.39326 7.3125 9.19445 7.25191 9.05069 7.19866C8.89497 7.14098 8.73386 7.06471 8.57928 6.98506C8.33423 6.8588 8.05742 6.69839 7.78968 6.54325C7.72435 6.50539 7.65955 6.46784 7.59589 6.43118C7.25702 6.23603 6.93614 6.05741 6.64888 5.92761C6.34115 5.78856 6.16522 5.75 6.09485 5.75C5.75062 5.75 5.42007 5.85254 5.18787 6.05259C4.97643 6.23475 4.77004 6.56219 4.77004 7.1875V9.06088C4.7707 9.19819 4.79025 9.43686 4.83425 9.66506C4.94053 9.57281 5.05309 9.48292 5.1722 9.39546C5.50608 9.15031 5.97547 9.22224 6.22062 9.55612C6.46577 9.88999 6.39385 10.3594 6.05997 10.6045C5.81926 10.7813 5.62748 10.9625 5.47331 11.1447C5.04223 11.6541 4.85949 12.227 4.789 12.8724C4.75865 13.1502 4.74966 13.4213 4.74975 13.6975C4.97192 13.6543 5.19231 13.625 5.38719 13.625C5.80141 13.625 6.13719 13.9608 6.13719 14.375C6.13719 14.7892 5.80141 15.125 5.38719 15.125C5.28121 15.125 5.07549 15.1544 4.77758 15.2271C4.80434 15.625 4.90168 15.9885 5.06027 16.3203C5.37069 16.2068 5.70504 16.125 6.03224 16.125C6.44646 16.125 6.78224 16.4608 6.78224 16.875C6.78224 17.245 6.51433 17.5524 6.16192 17.6138Z" fill="currentColor"/>`;

  let panelHasLoaded = false;

  function togglePanel() {
    let panel = document.getElementById(PANEL_ID);
    if (!panel) { createPanel(); panel = document.getElementById(PANEL_ID); }
    if (!panel) return;
    const isHidden = panel.style.display === 'none' || getComputedStyle(panel).display === 'none';
    if (isHidden) {
      panel.style.display = 'flex';
      if (!panelHasLoaded) {
        panelHasLoaded = true;
        loadAndRender();
      }
    } else {
      panel.style.display = 'none';
    }
  }

  function findHeaderIconRow() {
    // The row containing search/profile/notifications/chat. Anchor on the
    // stable aria-labeled Notifications button and walk up.
    const anchor = document.querySelector('[aria-label="Toggle Notifications Widget"]');
    return anchor ? anchor.parentElement : null;
  }

  function injectHeaderButton() {
    if (document.getElementById(TRIGGER_ID)) return; // already injected
    const row = findHeaderIconRow();
    if (!row || row.children.length < 2) return;
    // Row layout: [search, profile, notifications, chat]
    // We clone the search button (first child) to inherit Stake's icon styling
    // and replace the inner SVG with our cat face.
    const searchBtn = row.children[0];
    if (!searchBtn) return;
    const trigger = searchBtn.cloneNode(true);
    trigger.id = TRIGGER_ID;
    trigger.setAttribute('aria-label', 'K4D :: Treat me like a pirate');
    trigger.title = 'K4D :: Treat me like a pirate';
    const svg = trigger.querySelector('svg');
    if (svg) {
      // Force the viewBox to match the cat SVG's coordinate space, then swap
      // the inner paths. (Stake's icons already use 0 0 24 24, but this
      // future-proofs us if a deploy changes it.)
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.innerHTML = CAT_ICON_SVG;
    }
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePanel();
    });
    // Insert between search (index 0) and profile (index 1)
    row.insertBefore(trigger, row.children[1]);
  }

  function init() {
    // Kick off auth resolution immediately — the interceptor is already
    // installed (during IIFE init), and we want the bundle scrape to start
    // *before* the user opens the panel so tokens are usually ready.
    readAccessToken();
    triggerScrape();

    // Create the panel but keep it hidden until the cat icon is clicked.
    createPanel();
    const panel = document.getElementById(PANEL_ID);
    if (panel) panel.style.display = 'none';

    // Inject the cat trigger into Stake's header. Stake's SvelteKit reroutes
    // can re-mount the header; poll every 1.5s to re-inject if it disappears.
    injectHeaderButton();
    setInterval(injectHeaderButton, 1500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
