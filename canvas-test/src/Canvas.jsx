import React, { useRef, useEffect, useState } from 'react';

// some settings
const BEAD_COUNT = 30;
const BEAD_SIZE = 1; // radius for beads
const BEAD_DIST = 200 / (BEAD_COUNT + 2); // how far apart beads should be. 400 is canvas size, so we're just dividing it
const INITIAL_X_MOMENTUM = -10; // x speed / second of bottom bead when the click happens
const GRAVITY = 15; // downward acceleration / second
const X_FRICTION = 0.03; // constant decrease in x acceleration / second

const canvasWidth = 500;

function drawLine(ctx, parent) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(parent.x, parent.y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.restore();
}

function setParent(parentBead) {
  parent = parentBead;
}

function setSpeed(x, y) {
  speedX = x;
  speedY = y;
}

function addMomentum(x, y) {
  speedX += x;
  speedY += y;
}

function updateMomentum(deltaTime) {
  // gravity
  speedY += (GRAVITY * deltaTime) / 1000;
  if (Math.abs(speedX < speedX - (X_FRICTION * deltaTime) / 1000)) speedX = 0;
  else
    speedX =
      speedX > 0
        ? speedX - (X_FRICTION * deltaTime) / 1000
        : speedX + (X_FRICTION * deltaTime) / 1000;
}

function move() {
  x += speedX;
  y += speedY;
}

function positionBasedOnParent() {
  // check distance from parent
  if (parent) {
    let d = pythag(x, y, parent.x, parent.y);
    if (d > BEAD_DIST) {
      let a = getAngle(x, y, parent.x, parent.y);
      let dx = Math.cos(a) * (d - BEAD_DIST);
      let dy = Math.sin(a) * (d - BEAD_DIST);
      if (x > parent.x) {
        dx *= -1;
        dy *= -1;
      }
      //console.log(d, (a * 180 / Math.PI), dx, dy);

      if (parent instanceof Bead) {
        x += dx / 2;
        y += dy / 2;
        speedX += dx / 2;
        speedY += dy / 2;

        parent.x -= dx / 2;
        parent.y -= dy / 2;
        parent.speedX -= dx / 2;
        parent.speedY -= dy / 2;
      } else {
        x += dx;
        y += dy;
        speedX += dx;
        speedY += dy;
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
  let beads = [];

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

        // for each bead inside, i want to do those 3 functions and bead contains info
        // info -> x, y, vx, vy, parent { x, y }
        //

        beads.forEach(function (bead) {
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
