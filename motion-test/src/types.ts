import type { Variant, VisualElement } from 'framer-motion';

/**
 * An update function. It accepts a timestamp used to advance the animation.
 */
type Update = (timestamp: number) => void;

/**
 * Drivers accept a update function and call it at an interval. This interval
 * could be a synchronous loop, a setInterval, or tied to the device's framerate.
 */
export interface DriverControls {
  start: () => void;
  stop: () => void;
  now: () => number;
}

export type Driver = (update: Update) => DriverControls;

type EasingFunction = (v: number) => number;

type EasingModifier = (easing: EasingFunction) => EasingFunction;

type BezierDefinition = [number, number, number, number];

type EasingDefinition =
  | BezierDefinition
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate';

/**
 * The easing function to use. Set as one of:
 *
 * - The name of an in-built easing function.
 * - An array of four numbers to define a cubic bezier curve.
 * - An easing function, that accepts and returns a progress value between `0` and `1`.
 *
 * @public
 */
export type Easing = EasingDefinition | EasingFunction;

export interface AnimationPlaybackLifecycles<V> {
  onUpdate?: (latest: V) => void;
  onPlay?: () => void;
  onComplete?: () => void;
  onRepeat?: () => void;
  onStop?: () => void;
}

export interface Transition
  extends AnimationPlaybackOptions,
    Omit<SpringOptions, 'keyframes'>,
    Omit<InertiaOptions, 'keyframes'>,
    KeyframeOptions {
  delay?: number;
  elapsed?: number;
  driver?: Driver;
  type?: 'decay' | 'spring' | 'keyframes' | 'tween' | 'inertia';
  duration?: number;
  autoplay?: boolean;
}

export interface ValueAnimationTransition<V = any> extends Transition, AnimationPlaybackLifecycles<V> {}

export interface AnimationScope<T = any> {
  readonly current: T;
  animations: AnimationPlaybackControls[];
}

export type StyleTransitions = {
  [K in keyof CSSStyleDeclarationWithTransform]?: Transition;
};

export type VariableTransitions = {
  [key: `--${string}`]: Transition;
};

export type AnimationOptionsWithValueOverrides<V = any> = StyleTransitions &
  VariableTransitions &
  ValueAnimationTransition<V>;

export interface DynamicAnimationOptions extends Omit<AnimationOptionsWithValueOverrides, 'delay'> {
  delay?: number | DynamicOption<number>;
}

export type ElementOrSelector = Element | Element[] | NodeListOf<Element> | string;

/**
 * @public
 */
export interface AnimationPlaybackControls {
  time: number;
  speed: number;
  state?: AnimationPlayState;

  /*
   * The duration is the duration of time calculated for the active part
   * of the animation without delay or repeat,
   * which may be added as an extra prop at a later date.
   */
  duration: number;

  stop: () => void;
  play: () => void;
  pause: () => void;
  complete: () => void;
  cancel: () => void;
  then: (onResolve: VoidFunction, onReject?: VoidFunction) => Promise<void>;
}

export type DynamicOption<T> = (i: number, total: number) => T;

export interface CSSStyleDeclarationWithTransform
  extends Omit<CSSStyleDeclaration, 'direction' | 'transition' | 'x' | 'y' | 'z'> {
  x: number | string;
  y: number | string;
  z: number | string;
  rotateX: number | string;
  rotateY: number | string;
  rotateZ: number | string;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  skewX: number | string;
  skewY: number | string;
}

export type ValueKeyframe = string | number;

export type UnresolvedValueKeyframe = ValueKeyframe | null;

export type ValueKeyframesDefinition = ValueKeyframe | ValueKeyframe[] | UnresolvedValueKeyframe[];

export type StyleKeyframesDefinition = {
  [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframesDefinition;
};

export type VariableKeyframesDefinition = {
  [key: `--${string}`]: ValueKeyframesDefinition;
};

export type DOMKeyframesDefinition = StyleKeyframesDefinition & VariableKeyframesDefinition;

export interface VelocityOptions {
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}

export type RepeatType = 'loop' | 'reverse' | 'mirror';

export interface AnimationPlaybackOptions {
  repeat?: number;
  repeatType?: RepeatType;
  repeatDelay?: number;
}

export interface DurationSpringOptions {
  duration?: number;
  bounce?: number;
}

export interface SpringOptions extends DurationSpringOptions, VelocityOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface DecayOptions extends VelocityOptions {
  keyframes?: number[];
  power?: number;
  timeConstant?: number;
  modifyTarget?: (v: number) => number;
}

export interface InertiaOptions extends DecayOptions {
  bounceStiffness?: number;
  bounceDamping?: number;
  min?: number;
  max?: number;
}

export interface KeyframeOptions {
  ease?: Easing | Easing[];
  times?: number[];
}

export type AnimationDefinition = Variant;

/**
 * @public
 */
export interface AnimationControls {
  /**
   * Subscribes a component's animation controls to this.
   *
   * @param controls - The controls to subscribe
   * @returns An unsubscribe function.
   *
   * @internal
   */
  subscribe(visualElement: VisualElement): () => void;

  /**
   * Starts an animation on all linked components.
   *
   * @remarks
   *
   * ```jsx
   * controls.start("variantLabel")
   * controls.start({
   *   x: 0,
   *   transition: { duration: 1 }
   * })
   * ```
   *
   * @param definition - Properties or variant label to animate to
   * @param transition - Optional `transtion` to apply to a variant
   * @returns - A `Promise` that resolves when all animations have completed.
   *
   * @public
   */
  start(definition: AnimationDefinition, transitionOverride?: Transition): Promise<any>;

  /**
   * Instantly set to a set of properties or a variant.
   *
   * ```jsx
   * // With properties
   * controls.set({ opacity: 0 })
   *
   * // With variants
   * controls.set("hidden")
   * ```
   *
   * @privateRemarks
   * We could perform a similar trick to `.start` where this can be called before mount
   * and we maintain a list of of pending actions that get applied on mount. But the
   * expectation of `set` is that it happens synchronously and this would be difficult
   * to do before any children have even attached themselves. It's also poor practise
   * and we should discourage render-synchronous `.start` calls rather than lean into this.
   *
   * @public
   */
  set(definition: AnimationDefinition): void;

  /**
   * Stops animations on all linked components.
   *
   * ```jsx
   * controls.stop()
   * ```
   *
   * @public
   */
  stop(): void;
  mount(): () => void;
}
