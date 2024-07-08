export class GameObject {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    this.m = 0;
    this.width = 0;
    this.height = 0;
  }

  draw() {}

  update(deltaTime) {
    this.draw();
  }
}
