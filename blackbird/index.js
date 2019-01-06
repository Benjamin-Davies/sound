import { Voice } from '../voice.js';

const A = 220;
const B = A * 2 * Math.pow(2, 2 / 12);
const G = A * Math.pow(2, 10 / 12);

const volume = 0.2;

const ctx = new AudioContext();

const master = ctx.createGain();
master.gain.value = volume;
master.connect(ctx.destination);

const filter = ctx.createBiquadFilter();
filter.type = 'lowshelf';
filter.frequency.value = 400;
filter.gain.value = 25;
filter.connect(master);

const stringA = new Voice(ctx, 'square', 0.02, 0.1, 0.7, 0.2);
stringA.connect(filter);
const stringB = new Voice(ctx, 'square', 0.02, 0.1, 0.6, 0.2);
stringB.connect(filter);
const stringG = new Voice(ctx, 'square', 0.02, 0.1, 0.5, 0.2);
stringG.frequency.value = G;
stringG.connect(filter);

const stringANotes = [
  -2,
  0,
  2,
  10,
  10,
  10,
  10,
  3,
  7,
  5,
  9,
  7,
  7,
  6,
  6,
  5,
  4,
  3,
  3,
  3,
  3,
  2,
  2,
  0,
  0,
  5,
  5,
  -2,
  -2
].map(n => A * Math.pow(2, n / 12));
const stringBNotes = [
  0,
  1,
  3,
  12,
  12,
  12,
  12,
  5,
  8,
  7,
  10,
  8,
  8,
  8,
  8,
  7,
  8,
  5,
  5,
  4,
  4,
  3,
  3,
  2,
  2,
  1,
  1,
  0,
  0
].map(n => B * Math.pow(2, n / 12));

let i = 0;
document.addEventListener('click', () => {
  const interval = setInterval(() => {
    try {
      if (i % 2 === 0) {
        stringA.frequency.value = stringANotes[i / 2];
        stringB.frequency.value = stringBNotes[i / 2];
        stringA.attack();
        stringB.attack();
        stringG.release();
      } else {
        stringA.release();
        stringB.release();
        stringG.attack();
      }
    } catch (err) {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      console.warn(err);
      clearInterval(interval);
    }
    i++;
  }, 400);
});
