function calculateCollisionResponse(v1x, v2x, v1y, v2y, m1, m2) {
  let v1xFinal = ((m1 - m2) * v1x + 2 * m2 * v2x) / (m1 + m2);
  let v1yFinal = ((m1 - m2) * v1y + 2 * m2 * v2y) / (m1 + m2);
  let v2xFinal = ((m2 - m1) * v2x + 2 * m1 * v1x) / (m1 + m2);
  let v2yFinal = ((m2 - m1) * v2y + 2 * m1 * v1y) / (m1 + m2);
  return [v1xFinal, v1yFinal, v2xFinal, v2yFinal];
}

export function respondToCollisions(objects) {
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      const object1 = objects[i];
      const object2 = objects[j];
      const dx = object2.x - (object1.x + object1.width / 2);
      const dy = object2.y - (object1.y + object1.height / 2);

      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < object1.width + object2.width) {
        const [v1xFinal, v1yFinal, v2xFinal, v2yFinal] =
          calculateCollisionResponse(
            object1.vx,
            object2.vx,
            object1.vy,
            object2.vy,
            object1.m,
            object2.m
          );
        object1.vx = v1xFinal;
        object1.vy = v1yFinal;
        object2.vx = v2xFinal;
        object2.vy = v2yFinal;
      }
    }
  }
}
