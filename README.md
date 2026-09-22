# Huddle — Group Pools & Friend Fades (Prototype)

A React prototype for a friend-group sports betting product with two modes:

- **Group Pools** — everyone chips into a shared pot on a game; correct picks
  split the pot (or take it all, depending on the pool's rule).
- **Fade Board** — a direct 1-for-1 challenge where you bet *against* a
  specific friend's pick instead of the field.

Runs entirely on virtual **Club Points** with no real money involved — see
"Path to real money" below for why that's the deliberate starting point.

## Running it

```bash
npm install
npm run dev
```

Open the printed localhost URL. Use the row of avatars under the balance in
the header to switch "acting as" a different friend — that's how you can
demo the full multiplayer loop (create a pool, join it as someone else,
open a fade, take the other side, settle it) from one browser.

```bash
npm run build     # production build, output in dist/
```

## Project structure

```
src/
  data/            static/mock data — friends, fictional games, the rake constant
  utils/           formatting + id helpers
  context/
    AppContext.jsx  all state + business logic (balances, pools, fades,
                     ledger) exposed via a React Context + useApp() hook
  components/
    ui/            shared primitives: Avatar, Button, Card, Pill,
                   PointsTicker, Modal
    Header.jsx     balance + acting-as switcher
    Nav.jsx        bottom tab bar
    Dashboard.jsx  home screen
    pools/         Group Pools feature (tab + create modal)
    fades/         Fade Board feature (tab + create modal)
    ledger/        transaction history + balances
  App.jsx          wires provider + tabs + modals together
  main.jsx         React DOM entry point
```

The pattern: **data** is separated from **business logic** (`AppContext`)
which is separated from **presentation** (`components/`). This is the
convention to keep once real data starts replacing the mock games array —
you'd swap `src/data/games.js` for a real schedule/odds API without
touching a single component.

## The house rake

`RAKE` in `src/data/games.js` (currently 5%) is applied to every settled
pool and fade. This is the core monetization lever in this build — every
pot that resolves skims a cut to a "house" balance, visible in the Ledger
tab. In a real product this is where subscription tiers, coin-purchase
markups, or per-pool premium features would sit alongside it.

## Path to real money — read before pitching

This prototype intentionally uses non-redeemable virtual points. Real-money
peer-to-peer sports betting is regulated gambling in nearly every U.S.
state, and a platform that facilitates matched stakes or takes a cut is a
gambling operator in the eyes of regulators — "friends only" does not
exempt it, and unlicensed operation carries real legal exposure. This is
not a formality to route around; it's the central strategic question for
this business, and it's the first thing a sophisticated investor will
probe.

Three models currently used by real products in this space, roughly in
order of regulatory lift:

1. **Sweepstakes / dual-currency** — free-to-play "Gold Coins" plus
   promotional "Sweeps Coins" that redeem for cash prizes, no purchase
   required to enter. Operates under sweepstakes law rather than gambling
   law, which is why it's legal in most states without a gambling license.
   (Examples: Fliff, Rebet, Novig, Sportzino.)
2. **Licensed peer-to-peer exchange** — real money, users set their own
   odds, the platform takes a matching fee. Requires actual gambling/money
   transmitter licensing, state by state. (Examples: BettorEdge, ~45
   states; BetOpenly, ~1% fee model.)
3. **Daily-fantasy-style skill contest** — structured as a fantasy
   sports pick'em rather than a bet, using DFS legal carve-outs that exist
   in many states. (Examples: DraftKings Pick6, Fliff Superstars.)

Recommended sequencing for an MVP: validate retention and engagement on
virtual points (this build), then move to option 1 or 3 before
attempting option 2, which has the highest cost and longest timeline.

This is a general orientation, not legal advice — get counsel before any
version of this touches real money.

## Trust & safety features investors will expect before real stakes

- Age verification (18+/21+) and state-by-state geofencing
- Self-exclusion and spend-limit controls
- A clear dispute-resolution process for contested pool outcomes
- An auditable transaction ledger (this prototype's Ledger tab is a stub
  for that)
