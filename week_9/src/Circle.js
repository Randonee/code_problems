import { GameObject } from "./GameObject.js";

export class Circle extends GameObject {
  constructor(ctx) {
    super(ctx);
    this.m = 100;
    this.radius = 100;
    this.width = this.height = this.radius;
    this.vx = -200;
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }
}
