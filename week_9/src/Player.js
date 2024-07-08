import { Square } from "./Square.js";

export class Player extends Square {
  constructor(ctx, canvas) {
    super(ctx);
    this.canvas = canvas;

    this.speed = 50;

    document.addEventListener("keydown", (event) => {
      this.keysPressed[event.key] = true;
    });

    document.addEventListener("keyup", (event) => {
      delete this.keysPressed[event.key];
    });
  }

  draw() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(deltaTime) {
    if (this.keysPressed["ArrowLeft"]) this.vx -= this.speed;
    if (this.keysPressed["ArrowRight"]) this.vx += this.speed;
    if (this.keysPressed["ArrowUp"]) this.vy -= this.speed;
    if (this.keysPressed["ArrowDown"]) this.vy += this.speed;
    super.update(deltaTime);

    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > this.canvas.width)
      this.x = this.canvas.width - this.width;
    if (this.y + this.height > this.canvas.height)
      this.y = this.canvas.height - this.height;
  }
}
