import React, { useRef, useEffect, useState } from 'react';

// some settings
const BEAD_COUNT = 30;
const BEAD_SIZE = 1; // radius for beads
const BEAD_DIST = 200 / (BEAD_COUNT + 2); // how far apart beads should be. 400 is canvas size, so we're just dividing it
const INITIAL_X_MOMENTUM = -10; // x speed / second of bottom bead when the click happens
const GRAVITY = 15; // downward acceleration / second
const X_FRICTION = 0.03; // constant decrease in x acceleration / second

const canvasWidth = 500;

// beads
class Bead {
  constructor(initialX, initialY, ctx) {
    this.x = initialX;
    this.y = initialY;
    this.speedX = 0;
    this.speedY = 0;
    this.ctx = ctx;

    this.parent = {
      x: canvasWidth / 2,
      y: 0,
    };
  }

  drawLine() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.parent.x, this.parent.y);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
    this.ctx.restore();
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

function pythag(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
function getAngle(x1, y1, x2, y2) {
  return Math.atan((y2 - y1) / (x2 - x1));
}

const Canvas = () => {
  const canvasRef = useRef(null);
  const [pos, setPos] = useState({ x: 200, y: 100 });
  const [dragging, setDragging] = useState(false);
  const running = true;

  var beads = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const lit = false;
    let lastTime = 0;
    let dragging = false;
    let pos = { x: 0, y: 0 };

    for (let i = 0; i < BEAD_COUNT; i++) {
      beads.push(new Bead(canvas.width / 2, i * BEAD_DIST + BEAD_SIZE, ctx));
      if (i > 0) beads[i].setParent(beads[i - 1]);
    }

    // const updateCanvas = () => {
    //   ctx.clearRect(0, 0, canvasWidth, 400);
    //   draw(ctx);
    // };
    const draw = (ctx) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
      ctx.fill();
    };

    const loop = (now) => {
      let deltaTime = now - lastTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

      // your other drawing code goes here
      if (running) {
        console.log('run');
        ctx.clearRect(0, 0, canvasWidth, 400);

        if (beads[0].parent.y !== 0) {
          ctx.strokeStyle = lit ? '#c2cdd1' : '#737777';
          ctx.beginPath();
          ctx.moveTo(canvasWidth / 2, 0);
          ctx.lineTo(canvasWidth / 2, beads[0].parent.y);
          ctx.stroke();
        }

        ctx.strokeStyle = lit ? '#baaf62' : '#3d392d';
        ctx.fillStyle = lit ? '#544f3f' : '#2c2a1e';
        // split into 2 so we can double down on positioning constraints
        beads.forEach(function (bead) {
          //console.log(bead);
          bead.updateMomentum(deltaTime);
          bead.move();
          bead.positionBasedOnParent();
        });
        for (let i = 0; i < 20; i++) {
          beads.forEach(function (bead) {
            bead.positionBasedOnParent();
          });
        }
        beads.forEach(function (bead) {
          bead.drawLine();
          // console.log(bead);
        });
      }

      lastTime = now;
      requestAnimationFrame(loop);
    };

    // updateCanvas();
    loop();

    const handleMouseMove = (event) => {
      if (dragging) {
        const canvas = canvasRef.current;
        const canvasRect = canvas.getBoundingClientRect();
        const offsetX = canvasRect.left + window.scrollX;
        const offsetY = canvasRect.top + window.scrollY;
        setPos({
          x: event.clientX - offsetX,
          y: event.clientY - offsetY,
        });
      }
    };

    const handleMouseDown = () => {
      setDragging(true);
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, pos]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      style={{ border: '1px solid black' }}
    ></canvas>
  );
};

export default Canvas;
