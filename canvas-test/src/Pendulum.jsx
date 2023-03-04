import { useState } from 'react';
import { motion } from 'framer-motion';

const Pendulum = ({ length, angle, mass, dampening }) => {
  const [theta, setTheta] = useState(angle);
  const [omega, setOmega] = useState(0);

  const g = 9.81; // acceleration due to gravity (m/s^2)

  const onUpdate = (latest) => {
    setTheta(latest.x);
    setOmega(latest.v);
  };

  const force = -g * (mass / 1000) * Math.sin(theta); // gravitational force
  const springForce = -dampening * omega; // spring dampening force
  const acceleration = (force + springForce) / (length / 1000); // angular acceleration

  const canvasLength = 300;
  const canvasHeight = 300;

  const x = Math.sin(theta) * (length / 1000) * canvasLength;
  const y = Math.cos(theta) * (length / 1000) * canvasHeight;

  return (
    <>
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#3c3c3c',
          position: 'absolute',
          top: y + canvasHeight / 2,
          left: x + canvasLength / 2,
        }}
        drag
        onUpdate={onUpdate}
        dragConstraints={{
          top: 0,
          bottom: canvasHeight,
          left: 0,
          right: canvasLength,
        }}
      ></motion.div>
      <motion.div
        style={{
          position: 'absolute',
          top: y + canvasHeight / 2,
          left: x + canvasLength / 2,
          width: 2,
          height: length * canvasHeight,
          background: '#3c3c3c',
          transformOrigin: 'top',
          rotate: theta * (180 / Math.PI),
        }}
      ></motion.div>
    </>
  );
};

const SoftPendulum = ({ numPendulums, pendulumLength, pendulumAngle }) => {
  const pendulumList = [];
  for (let i = 0; i < numPendulums; i++) {
    const dampening = 0.2 + i * 0.1;
    pendulumList.push(
      <Pendulum
        key={i}
        length={pendulumLength}
        angle={pendulumAngle}
        mass={1000}
        dampening={dampening}
      />
    );
  }
  return <>{pendulumList}</>;
};

export default SoftPendulum;
