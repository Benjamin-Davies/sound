import { Envelope } from './envelope.js';

export class Voice {
  /**
   * @param {AudioContext} ctx
   * @param {string} type
   * @param {number[]} envelopeParams
   */
  constructor(ctx, type = 'sine', ...envelopeParams) {
    this.envelope = new Envelope(ctx, ...envelopeParams);

    this.oscillator = ctx.createOscillator();
    this.oscillator.type = type;
    this.oscillator.connect(this.envelope.gain);
    this.oscillator.start();
  }

  /**
   * @param {number} [startTime]
   */
  attack(startTime) {
    this.envelope.attack(startTime);
  }

  /**
   * @param {number} [startTime]
   */
  release(startTime) {
    this.envelope.release(startTime);
  }

  /**
   * @param {AudioNode} to
   */
  connect(to) {
    this.envelope.connect(to);
  }

  get frequency() {
    return this.oscillator.frequency;
  }
}
