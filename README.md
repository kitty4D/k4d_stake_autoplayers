# k4d_stake_autoplayers

Tampermonkey userscripts that automate betting strategies on stake.us casino games. Source is **fully unobfuscated** - read every line before you install or run anything.

**Author:** [kitty4D](https://x.com/kitty4dhd) · **Remote:** [github.com/kitty4D/k4d_stake_autoplayers](https://github.com/kitty4D/k4d_stake_autoplayers)

## sure

`kitty4d.sol` · `kitty4d.eth` · `kitty4d.sui`

i lost my stake account due to state ban in 2025, but u might find me at -
MoonRoll [moonroll.io/r/index](https://moonroll.io/r/index), Shuffle.us [shuffle.us/?r=index](https://shuffle.us/?r=index), Flip.gg [flip.gg/a/index](https://flip.gg/a/index), and SolCasino [solcasino.io/r/index](https://solcasino.io/r/index). 

## disclaimer

these scripts interact with your logged-in session and place real wagers (using your selected method, either GC or SC). they are provided for education and personal use. gambling involves risk of loss. stake’s terms of service may restrict automation; use at your own risk. the author is not responsible for losses, account actions, or API changes. glhf~!

## requirements

- [Tampermonkey](https://www.tampermonkey.net/) (or compatible userscript manager)
- active Stake.us account, logged in on the matching game page
- scripts only run on `stake.us` URLs listed in each file’s `@match` header

## installation

1. install Tampermonkey in your browser.
2. open the script file you want (see below), copy the full contents, and create a **new script** in Tampermonkey -> paste -> save.
3. navigate to the correct Stake.us game while logged in. the floating panel should appear after the page loads.

## scripts

| file | game | tampermonkey name |
|------|------|-------------------|
| `k4d-the-moleman-cometh.js` | [moles](https://stake.us/casino/games/moles) | K4D :: THE MOLEMAN COMETH |
| `k4d-keep-rollin.user.js` | [dice](https://stake.us/casino/games/dice) | K4D :: KEEP ROLLIN ROLLIN ROLLIN ROLLIN |
| `k4d-snackpack-blackjack.user.js` | [blackjack](https://stake.us/casino/games/blackjack) | K4D :: SNACKPACK BLACKJACK DONT STEP ON CRACK |
| `k4d-plinko-blinko.user.js` | [plinko](https://stake.us/casino/games/plinko) | K4D :: PLINKO BLINKO DONT BE A STINKO |

### `k4d-the-moleman-cometh.js` — moles (v4.0)

**matches:** `https://stake.us/casino/games/moles*`

auto-plays stake.us **moles**: bet, pick holes for N rounds, cash out when you clear the run, then apply your strategy before the next game.

#### what it does

- draggable **K4D** panel (strategy cards, bet/budget, stats, log).
- hits `/_api/casino/moles/`:
  - `bet` — amount, mole count, identifier
  - `next` — hole pick `0`–`6`
  - `cashout` — after all target rounds hit
- auth (no manual token paste):
  - `x-access-token` from `session` cookie (`cookieStore`)
  - `x-lockdown-token` scraped from stake’s config chunk (e.g. `PuzceZiU.js`), plus `fetch` hook as backup
- **GC** / **SC** from the coin toggle.

#### strategy presets

| key | label | summary |
|-----|--------|---------|
| `grinder` | grinder | 5 moles, 1 round; +15% bet on loss |
| `balanced` | balanced | 3 moles, 2 rounds; +10% on loss (default) |
| `aggressive` | aggressive | 2 moles, 3 rounds; reset bet on loss |
| `progressive` | progressive | dynamic rounds: +1 on win, reset on loss |
| `martingale` | martingale | 2× bet on loss, reset on win |
| `paroli` | paroli | 2× bet on win, reset on loss |
| `dalembert` | d'alembert | ±1 unit ($) on win/loss |
| `depthchaser` | depth chaser | rounds track last win depth; depth−1 on loss |
| `escalator` | escalator | fewer moles on win, more on loss |
| `custom` | custom | all knobs manual |

**axes** on each card (toggle which fields a preset overwrites): **B** bet · **R** rounds · **M** moles.

#### advanced

- bet/game, session budget, max games, min/max bet (floor **0.10** on stake).
- pick mode: random or fixed pattern (7-tile honeycomb).
- dynamic rounds/moles (`match-win-depth`, `match-depth`, `match-depth-minus`, etc.).
- stop on $ or % gain/loss vs session start.
- jitter + occasional long pauses so it doesn’t look like a metronome.

### `k4d-keep-rollin.user.js` — dice (v4.0)

**matches:** `https://stake.us/casino/games/dice*`

auto-plays stake.us **dice**: repeat rolls with win %, roll above/below target, and bet progression between rolls.

#### what it does

- same panel pattern as moles (K4D chrome, presets, advanced, log).
- one **API** call per roll: `POST /_api/casino/dice/roll` with `target`, `condition` (`above` \| `below`), `amount`, `currency`, `identifier`.
- target from win %; payout mult ≈ `99 / chance` (house edge).
- same dual-token auth as moles.

#### strategy presets

| key | label | summary |
|-----|--------|---------|
| `flat` | flat | ~50% chance, flat bet (default) |
| `martingale` | martingale | 2× on loss |
| `paroli` | paroli | 2× on win |
| `dalembert` | d'alembert | ±1 unit on win/loss |
| `grinder` | grinder | 70% chance, +20% on loss |
| `lotto` | lotto | 5% chance, big mult |
| `climber` | chance climber | dynamic %: down on win, up on loss |
| `fader` | chance fader | dynamic %: up on win, down on loss |
| `streak` | streak rider | +25% bet on win |
| `custom` | custom | all knobs manual |

**axes:** **B** bet · **C** win chance % (dynamic min/max + win/loss nudges).

#### advanced

- chance %, direction, bet limits, dynamic chance rules.
- same session limits, budget, stop gain/loss, pacing as moles.

### `k4d-snackpack-blackjack.user.js` — blackjack (v4.0)

**matches:** `https://stake.us/casino/games/blackjack*`

auto-plays stake.us **blackjack**: deal, run your chosen play logic (hit/stand/double/split), settle the hand, then adjust bet size before the next hand.

#### what it does

- draggable **K4D** panel (play + bet presets, stats, log).
- hits `/_api/casino/blackjack/`:
  - `bet` — amount, identifier, currency
  - `next` — `hit`, `stand`, `double`, `split`, `insurance` (fresh identifier per action)
- built-in **play logic** engines (`basic` strategy chart, dealer mimic, never bust, aggressive doubles/splits, etc.) separate from bet progression.
- same dual-token auth as the other scripts.
- **GC** / **SC**; stats track wins, losses, pushes, blackjacks.

#### strategy presets

| key | label | summary |
|-----|--------|---------|
| `basic` | basic strategy | optimal play, flat bet |
| `basicMart` | basic + martingale | optimal play, 2× on loss |
| `basicParoli` | basic + paroli | optimal play, 2× on win |
| `cutoff17` | stand on 17 | hit below 17, no double/split |
| `dealerMimic` | dealer mimic | hit below 17, stand soft 17+ |
| `neverBust` | never bust | stand on 12+ always |
| `aggressive` | aggressive | hit to 16, double 9–11, split aces/8s |
| `alwaysStand` | always stand | sanity check / meme |
| `custom` | custom | basic strategy play, manual bet rules |

**axes:** **B** bet · **P** play logic (preset picks the `play` engine; always on for cards).

#### advanced

- bet/game, budget, max hands, min/max bet (floor **0.10**).
- bet adjust on win/loss ($ or %).
- stop on gain/loss; jitter between hands.
- read `PLAY_LOGIC` in source if you want to fork decision trees.

### `k4d-plinko-blinko.user.js` — plinko (v4.0)

**matches:** `https://stake.us/casino/games/plinko*`

auto-plays stake.us **plinko**: drop balls with configurable rows (8–16), risk (`low` / `medium` / `high` / `expert`), and bet progression.

#### what it does

- draggable **K4D** panel; embeds stake’s payout ladder per row/risk (scraped from DOM, `PLINKO_MULT_TABLE` in source).
- one **API** call per drop: `POST /_api/casino/plinko/bet` with `amount`, `rows`, `risk`, `currency`, `identifier`.
- win = `payoutMultiplier` above 1 (partial returns like 0.5× count as losses).
- same dual-token auth as the other scripts.
- **GC** / **SC**.

#### strategy presets

| key | label | summary |
|-----|--------|---------|
| `flat` | flat | fixed bet, medium / 16 rows |
| `martingale` | martingale | 2× on loss, low risk default |
| `paroli` | paroli | 2× on win |
| `safeBoy` | safe boy | 8 rows, low risk, flat bet |
| `moonShot` | moon shot | expert + 16 rows (edge slots up to 10000×) |
| `riskClimber` | risk climber | dynamic risk: harder on win, easier on loss |
| `riskFader` | risk fader | dynamic risk: easier on win, harder on loss |
| `rowClimber` | row climber | dynamic rows: +1 on win, −1 on loss |
| `custom` | custom | all knobs manual |

**axes:** **B** bet · **D** risk/difficulty · **R** rows (8–16).

#### advanced

- bet/game, budget, max drops, min/max bet.
- dynamic risk (`easier` / `harder` steps) and/or dynamic rows (+/− N).
- live max-mult display from the baked payout table.
- same session limits, stop gain/loss, pacing as moles.

---

## shared behavior

all scripts share the same approach:

- **read the source** — no minification; console logging on API requests/responses for debugging.
- **retries** on network errors, 5xx, and 429 rate limits.
- **stop** button finishes the current game/roll when possible, then exits the loop.
- **stats:** games played, W/L, wagered, returned, net, current bet (and dynamic chance/rounds/moles where applicable).

## License

[MIT](LICENSE) — Copyright (c) 2026 kitty4D
