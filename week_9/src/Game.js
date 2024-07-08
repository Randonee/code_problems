import { respondToCollisions } from "./Collision.js";
import { Player } from "./Player.js";
import { Circle } from "./Circle.js";
import { Square } from "./Square.js";

export class Game {
  constructor(canvas) {
    this.objects = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.lastTime = 0;
    this.addCircleInterval = null;
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects = this.objects.filter((obj) => obj !== object);
  }

  gameLoop(time) {
    const deltaTime = (time - this.lastTime) / 1000 || 0;
    this.lastTime = time;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach((object) => object.update(deltaTime));
    this.checkObjectsOffScreen();
    respondToCollisions(this.objects);
    requestAnimationFrame((time) => this.gameLoop(time));
  }

  checkObjectsOffScreen() {
    this.objects.forEach((object) => {
      if (
        object.x < 0 ||
        object.x > this.canvas.width ||
        object.y < 0 ||
        object.y > this.canvas.height
      ) {
        this.removeObject(object);
      }
    });
  }

  start() {
    const player = new Player(this.ctx, canvas);
    const square = new Square(this.ctx);

    player.x = 50;
    player.y = canvas.height / 2 - 25;
    square.x = 100;
    square.y = 100;

    this.addObject(player);
    this.addObject(square);

    this.lastTime = 0;
    this.gameLoop();

    this.scheduleNextCircle();
  }

  scheduleNextCircle() {
    const randomInterval = Math.random() * 5000;
    this.addCircleInterval = setTimeout(() => {
      const circle = new Circle(this.ctx);
      circle.x = Math.random() * this.canvas.width;
      circle.y = Math.random() * this.canvas.height;
      this.addObject(circle);
      this.scheduleNextCircle();
    }, randomInterval);
  }
}
