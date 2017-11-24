export class Envelope {
  /**
   * @param {AudioContext} ctx
   */
  constructor(ctx, at = 0.1, dt = 0.1, dl = 0.7, rt = 0.2) {
    this.attackTime = at;
    this.decayTime = dt;
    this.decayLevel = dl;
    this.releaseTime = rt;

    this.ctx = ctx;
    this.gain = ctx.createGain();
    this.gain.gain.value = 0;
  }

  /**
   * @param {number} startTime
   */
  attack(startTime = this.ctx.currentTime) {
    this.gain.gain.cancelScheduledValues(startTime);
    this.gain.gain.setValueAtTime(0, startTime);
    this.gain.gain.linearRampToValueAtTime(1, startTime + this.attackTime);
    this.gain.gain.linearRampToValueAtTime(
      this.decayLevel,
      startTime + this.attackTime + this.decayTime
    );
  }

  /**
   * @param {number} startTime
   */
  release(startTime = this.ctx.currentTime) {
    this.gain.gain.cancelScheduledValues(startTime);
    this.gain.gain.linearRampToValueAtTime(0, startTime + this.releaseTime);
  }

  /**
   * @param {AudioNode} to
   */
  connect(to) {
    this.gain.connect(to);
  }
}
