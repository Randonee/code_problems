import { GameObject } from "./GameObject.js";

export class Square extends GameObject {
  constructor(ctx) {
    super(ctx);
    this.m = 10;
    this.height = 50;
    this.width = 50;
    this.keysPressed = {};
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }
}
