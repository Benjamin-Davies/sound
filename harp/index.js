import { Voice } from '../voice.js';

let volume = 0.2;

const ctx = new AudioContext();

const master = ctx.createGain();
master.gain.value = volume;
master.connect(ctx.destination);

const voice = new Voice(ctx);
voice.connect(master);

document.addEventListener('mousedown', ev => {
  voice.frequency.linearRampToValueAtTime(ev.clientX, ctx.currentTime + 0.05);
  voice.attack();
});
document.addEventListener('mouseup', () => {
  voice.release();
});
document.addEventListener('mousemove', ev => {
  voice.frequency.linearRampToValueAtTime(ev.clientX, ctx.currentTime + 0.05);
});
