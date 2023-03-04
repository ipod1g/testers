import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Pendulum = ({ length, angle, mass, dampening }) => {
  const g = 9.81; // acceleration due to gravity (m/s^2)

  // Define the positions of the pivots in the string
  const pivotPositions = Array.from({ length: 10 }, (_, i) => i / 10);

  // Calculate the x and y positions of the pendulum
  const x = Math.sin(angle) * length;
  const y = Math.cos(angle) * length;

  // Create a spring for the angle and angular velocity of the pendulum
  const [{ theta, omega }, set] = useSpring(() => ({ theta: angle, omega: 0 }));

  // Define state for tracking mouse position and button press
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Apply the forces to the pendulum's angle and angular velocity
  set({
    to: async (next) => {
      while (true) {
        const { theta, omega } = await next({ theta: angle, omega: 0 });
        let force = -g * (mass / 1000) * Math.sin(theta); // gravitational force
        const springForce = -dampening * omega; // spring dampening force

        // Add mouse drag force if the mouse is pressed
        if (isDragging) {
          const pendulumPos = { x, y };
          const mouseDiff = {
            x: mousePos.x - (pendulumPos.x + 150),
            y: mousePos.y - (pendulumPos.y + 100),
          };
          const displacement = Math.sqrt(
            mouseDiff.x * mouseDiff.x + mouseDiff.y * mouseDiff.y
          );
          const dragForce = displacement * 0.01 * (mouseDiff.y > 0 ? 1 : -1);
          force += dragForce;
        }

        const acceleration = (force + springForce) / (length / 1000); // angular acceleration
        const newOmega = omega + acceleration * 0.01; // integrate to get new angular velocity
        const newTheta = theta + newOmega * 0.01; // integrate to get new angle
        angle = newTheta; // update the angle variable
        if (Math.abs(newOmega) < 0.001) break; // stop if the pendulum has stopped moving
        await next({ theta: newTheta, omega: newOmega });
      }
    },
  });

  return (
    <>
      {/* Map over the pivot positions and create the string elements */}
      {pivotPositions.map((pivotPosition) => (
        <animated.div
          key={pivotPosition}
          style={{
            width: 5,
            height: 10,
            borderRadius: '50%',
            background: isDragging ? '#a0a0a0' : '#3c3c3c',
            position: 'absolute',
            top: y * pivotPosition + y,
            left: x * pivotPosition + x + 160,
          }}
        />
      ))}
      <animated.div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#3c3c3c',
          position: 'absolute',
          top: y + 100,
          left: x + 150,
        }}
        onMouseDown={() => {
          set({ omega: 0 }); // stop the pendulum from swinging
          setIsDragging(true);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (isDragging) {
            const dx = e.clientX - (x.get() + 150); // calculate the change in x position
            const dy = e.clientY - (y.get() + 100); // calculate the change in y position
            const newTheta = Math.atan2(dx, dy); // calculate the new angle of the pendulum
            set({ theta: newTheta }); // set the new angle
          }
        }}
      />
    </>
  );
};

function App() {
  return <Pendulum length={100} angle={0.1} mass={100} dampening={0.2} />;
}
export default App;
