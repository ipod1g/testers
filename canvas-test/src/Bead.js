// some settings
const BEAD_COUNT = 30;
const BEAD_SIZE = 0; // radius for beads
const BEAD_DIST = 500 / (BEAD_COUNT + 2); // how far apart beads should be. 400 is canvas size, so we're just dividing it
const INITIAL_X_MOMENTUM = -10; // x speed / second of bottom bead when the click happens
const GRAVITY = 15; // downward acceleration / second
const X_FRICTION = 0.03; // constant decrease in x acceleration / second

// helpers
function pythag(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
function getAngle(x1, y1, x2, y2) {
  return Math.atan((y2 - y1) / (x2 - x1));
}

// setup canvas
// var canvas = stringCanvas;
// var ctx = canvas.getContext('2d');
// var running = true;
// var lit = switchInp.checked;

// beads
export default class Bead {
  constructor(initialX, initialY, canvas, ctx) {
    this.x = initialX;
    this.y = initialY;
    this.canvas = canvas;
    this.speedX = 0;
    this.speedY = 0;
    this.lit = false;
    this.running = true;
    this.parent = {
      x: canvas.width / 2,
      y: 0,
    };
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - BEAD_SIZE);
    ctx.arc(this.x, this.y, BEAD_SIZE, 0, Math.PI * 2, false);

    var grd;
    if (lit) {
      grd = ctx.createRadialGradient(
        this.x,
        this.y,
        BEAD_SIZE,
        this.x - BEAD_SIZE / 2,
        this.y - BEAD_SIZE / 4,
        BEAD_SIZE * 0.75
      );
      grd.addColorStop(1, '#c98b4c');
      grd.addColorStop(0, '#967e54');
      ctx.fillStyle = grd;
    } else {
      grd = ctx.createRadialGradient(
        this.x,
        this.y,
        BEAD_SIZE,
        this.x - BEAD_SIZE / 2,
        this.y - BEAD_SIZE / 4,
        BEAD_SIZE * 0.75
      );
      grd.addColorStop(1, '#4a5425');
      grd.addColorStop(0, '#172023');
      ctx.fillStyle = grd;
    }
    ctx.fillStyle = grd;
    ctx.fill();
    var highlight = ctx.createRadialGradient(
      this.x,
      this.y,
      BEAD_SIZE,
      this.x + BEAD_SIZE / 3,
      this.y + BEAD_SIZE / 6,
      BEAD_SIZE
    );
    highlight.addColorStop(0, '#f4db97');
    highlight.addColorStop(1, 'rgba(195, 229, 228, 0)');
    ctx.fillStyle = highlight;
    ctx.fill();
    ctx.restore();
  }

  drawLine() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.parent.x, this.parent.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }

  setParent(parentBead) {
    this.parent = parentBead;
  }

  setSpeed(x, y) {
    this.speedX = x;
    this.speedY = y;
  }

  addMomentum(x, y) {
    this.speedX += x;
    this.speedY += y;
  }

  updateMomentum(deltaTime) {
    // gravity
    this.speedY += (GRAVITY * deltaTime) / 1000;
    if (Math.abs(this.speedX < this.speedX - (X_FRICTION * deltaTime) / 1000))
      this.speedX = 0;
    else
      this.speedX =
        this.speedX > 0
          ? this.speedX - (X_FRICTION * deltaTime) / 1000
          : this.speedX + (X_FRICTION * deltaTime) / 1000;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  positionBasedOnParent() {
    // check distance from parent
    if (this.parent) {
      let d = pythag(this.x, this.y, this.parent.x, this.parent.y);
      if (d > BEAD_DIST) {
        let a = getAngle(this.x, this.y, this.parent.x, this.parent.y);
        let dx = Math.cos(a) * (d - BEAD_DIST);
        let dy = Math.sin(a) * (d - BEAD_DIST);
        if (this.x > this.parent.x) {
          dx *= -1;
          dy *= -1;
        }
        //console.log(d, (a * 180 / Math.PI), dx, dy);

        if (this.parent instanceof Bead) {
          this.x += dx / 2;
          this.y += dy / 2;
          this.speedX += dx / 2;
          this.speedY += dy / 2;

          this.parent.x -= dx / 2;
          this.parent.y -= dy / 2;
          this.parent.speedX -= dx / 2;
          this.parent.speedY -= dy / 2;
        } else {
          this.x += dx;
          this.y += dy;
          this.speedX += dx;
          this.speedY += dy;
        }
      }
    }
  }
}
