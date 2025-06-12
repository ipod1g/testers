// https://codesandbox.io/s/timeline-framer-motion-frodj?file=/src/App.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { findLastIndex, matches } from 'lodash/fp';
import {
  CSSReset,
  ThemeProvider,
  theme as defaultTheme,
  useTheme,
  Icon,
  Box,
  Text,
  Stack,
  Button,
} from '@chakra-ui/core';
import { useRect } from '@reach/rect';
import { AnimateSharedLayout, motion } from 'framer-motion';

const steps: Step[] = [
  {
    state: 0,
    info: (
      <>
        <Text>Created</Text>
        <Text>Jun. 14, 2020</Text>
      </>
    ),
    icon: 'sun',
  },
  {
    state: 1,
    info: 'Sourcing',
    icon: 'moon',
  },
  {
    state: 2,
    info: 'Evaluating',
    icon: 'phone',
  },
  { state: 3, info: 'Complete', icon: 'lock' },
];

const brand = {
  50: '#ddf3ee',
  100: '#ddf3ee',
  200: '#ddf3ee',
  300: '#abe1d3',
  400: '#71cdb6',
  500: '#26b999',
  600: '#00a984',
  700: '#009971',
  800: '#008c65',
  900: '#007b56',
};

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    brand,
  },
};

type Step = {
  state: number;
  info: React.ReactNode;
  icon: string;
};

type TimelinePointProps = {
  isActive: boolean;
  isCurrent: boolean;
  x: number;
};

const pointVariants = {
  inactive: {
    r: 1.5,
    fill: '#fff',
    stroke: theme.colors.gray['400'],
    strokeWidth: 0.5,
    strokeOpacity: 1,
  },
  active: {
    r: 1.5,
    fill: 'url(#active)',
    strokeWidth: 0,
    strokeOpacity: 0,
  },
  current: {
    r: 2.5,
    stroke: 'url(#active)',
    strokeWidth: 2.5,
    strokeOpacity: 0.4,
    fill: 'url(#active)',
  },
};

const TimelinePoint = React.forwardRef<SVGCircleElement, TimelinePointProps>(({ isActive, isCurrent, x }, ref) => {
  const { colors } = useTheme() as typeof theme;

  return (
    <motion.circle
      ref={ref}
      initial="inactive"
      animate={isCurrent ? 'current' : isActive ? 'active' : 'inactive'}
      variants={pointVariants}
      cx={x}
      cy="0"
    />
  );
});

export type StepProps = {
  step: Step;
  isCurrent: boolean;
  point: DOMRect;
  container: React.RefObject<any>;
};

const Step = ({ step, isCurrent, point, container }: StepProps) => {
  const content = React.useRef();
  const contentRect = useRect(content);

  const centerX = point.left + point.width / 2;
  const centerY = point.top + point.height / 2;

  return ReactDOM.createPortal(
    <>
      {isCurrent && (
        <Icon
          position="absolute"
          color="white"
          top={point.top + point.height / 4}
          left={point.left + point.width / 4}
          width={point.width / 2}
          height={point.height / 2}
          name={step.icon}
        />
      )}
      <Box
        ref={content}
        key={step.state}
        position="absolute"
        top={centerY + 25}
        left={centerX - (contentRect ? contentRect.width / 2 : 0)}
        textAlign="center"
      >
        {step.info}
      </Box>
    </>,
    container.current,
  );
};

type TimelineStepProps = {
  step: Step;
  x: number;
  isActive: boolean;
  isCurrent: boolean;
  container: React.RefObject<any>;
};

const TimelineStep = ({ step, x, isActive, isCurrent, container }: TimelineStepProps) => {
  const point = React.useRef<SVGCircleElement>(null);
  const pointRect = useRect(point);

  return (
    <>
      <TimelinePoint x={x} isActive={isActive} isCurrent={isCurrent} ref={point} />
      {pointRect && <Step step={step} isCurrent={isCurrent} point={pointRect} container={container} />}
    </>
  );
};

const SvgTimeline = ({ steps, activeStep }: { steps: Step[]; activeStep: number }) => {
  const portal = React.useRef();
  const { colors } = useTheme() as typeof theme;

  const activePercent = Math.round((100 / (steps.length - 1)) * activeStep);
  const indexToPercent = (index: number) => Math.round(100 / (steps.length - 1)) * index;

  return (
    <AnimateSharedLayout>
      <Box position="relative" ref={portal}>
        <Box
          as="svg"
          w="100%"
          zIndex={-1}
          // @ts-expect-error
          viewBox="-10 -10 120 30"
        >
          <defs>
            <linearGradient id="active" x1="0" y1="0" x2={activePercent} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={colors.brand['500']} />
              <stop offset="1" stopColor={colors.blue['500']} />
            </linearGradient>
          </defs>
          <motion.line
            initial={{ x2: 0 }}
            animate={{ x2: activePercent }}
            transition={{ type: 'tween' }}
            x1="0"
            y1="0"
            y2="0"
            fill="none"
            strokeWidth="2"
            stroke="url(#active)"
            vectorEffect="non-scaling-stroke"
          />
          <motion.line
            initial={{ x1: 0 }}
            animate={{ x1: activePercent }}
            transition={{ type: 'tween' }}
            y1="0"
            x2="100"
            y2="0"
            fill="none"
            strokeWidth="2"
            strokeDasharray="6"
            stroke={colors.gray['300']}
            vectorEffect="non-scaling-stroke"
          />
          {steps.map((step, i) => (
            <TimelineStep
              key={step.state}
              x={indexToPercent(i)}
              step={step}
              isActive={i <= activeStep}
              isCurrent={i === activeStep}
              container={portal}
            />
          ))}
        </Box>
      </Box>
    </AnimateSharedLayout>
  );
};

export default function App() {
  const [activeStep, setActiveStep] = React.useState(3);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Stack spacing={8}>
        <SvgTimeline steps={steps} activeStep={activeStep} />
        <Stack isInline justifyContent="center">
          {steps.map((_step, i) => (
            <Button onClick={() => setActiveStep(i)}>{i}</Button>
          ))}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
