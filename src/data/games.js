// Fictional matchups for prototype purposes — swap for a live odds/schedule
// feed (e.g. a licensed sports data provider) when moving past the demo.
export const GAMES = [
  { id: "g1", sport: "FOOTBALL", a: "Ironhawks", b: "Coyotes", time: "Sun 1:05 PM", locksInMin: 42 },
  { id: "g2", sport: "BASKETBALL", a: "Vipers", b: "Comets", time: "Sun 4:30 PM", locksInMin: 118 },
  { id: "g3", sport: "FOOTBALL", a: "Falcons", b: "Bulldogs", time: "Mon 6:15 PM", locksInMin: 340 },
];

export const gameById = (id) => GAMES.find((g) => g.id === id);

// House cut applied on every settled pool and fade — the core revenue lever.
export const RAKE = 0.05;
