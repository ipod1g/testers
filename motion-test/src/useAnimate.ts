import { useRef } from 'react';
import { useEffect } from 'react';
import { MotionValue } from 'framer-motion';
import { GroupPlaybackControls } from './GroupPlaybackControls';
import {
  AnimationPlaybackControls,
  AnimationScope,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ElementOrSelector,
  ValueAnimationTransition,
} from './types';
import { animateTarget } from './interfaces/visual-element-target';
import { GenericKeyframesTarget, TargetAndTransition } from '../types';
import { createVisualElement } from './utils/create-visual-element';
import { animateSingleValue } from './interfaces/single-value';
import { AnimationSequence, SequenceOptions } from './sequence/types';
import { createAnimationsFromSequence } from './sequence/create';
import { isMotionValue } from '../value/utils/is-motion-value';
import type { VisualElement } from 'framer-motion';

type Init<T> = () => T;

import { transformProps } from '../../render/html/utils/transform';
import type { AnimationTypeState } from '../../render/utils/animation-state';
import type { VisualElementAnimationOptions } from './types';
import { animateMotionValue } from './motion-value';
import { setTarget } from '../../render/utils/setters';
import { getValueTransition } from '../utils/transitions';
import { frame } from '../../frameloop';
import { getOptimisedAppearId } from '../optimized-appear/get-appear-id';
import { addValueToWillChange } from '../../value/use-will-change/add-will-change';

/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation({ protectedKeys, needsAnimating }: AnimationTypeState, key: string) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;

  needsAnimating[key] = false;
  return shouldBlock;
}

export function animateTarget(
  visualElement: VisualElement,
  targetAndTransition: TargetAndTransition,
  { delay = 0, transitionOverride, type }: VisualElementAnimationOptions = {},
): AnimationPlaybackControls[] {
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;

  if (transitionOverride) transition = transitionOverride;

  const animations: AnimationPlaybackControls[] = [];

  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];

  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key as keyof typeof target];

    if (valueTarget === undefined || (animationTypeState && shouldBlockAnimation(animationTypeState, key))) {
      continue;
    }

    const valueTransition = {
      delay,
      elapsed: 0,
      ...getValueTransition(transition || {}, key),
    };

    /**
     * If this is the first time a value is being animated, check
     * to see if we're handling off from an existing animation.
     */
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);

      if (appearId) {
        const elapsed = window.MotionHandoffAnimation(appearId, key, frame);

        if (elapsed !== null) {
          valueTransition.elapsed = elapsed;
          isHandoff = true;
        }
      }
    }

    value.start(
      animateMotionValue(
        key,
        value,
        valueTarget,
        visualElement.shouldReduceMotion && transformProps.has(key) ? { type: false } : valueTransition,
        visualElement,
        isHandoff,
        addValueToWillChange(visualElement, key),
      ),
    );

    const animation = value.animation;

    if (animation) {
      animations.push(animation);
    }
  }

  if (transitionEnd) {
    Promise.all(animations).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
    });
  }

  return animations;
}

export function isDOMKeyframes(keyframes: unknown): keyframes is DOMKeyframesDefinition {
  return typeof keyframes === 'object' && !Array.isArray(keyframes);
}

export interface WithQuerySelectorAll {
  querySelectorAll: Element['querySelectorAll'];
}

export function resolveElements(
  elements: ElementOrSelector,
  scope?: AnimationScope,
  selectorCache?: { [key: string]: NodeListOf<Element> },
): Element[] {
  if (typeof elements === 'string') {
    let root: WithQuerySelectorAll = document;

    if (scope) {
      //   invariant(Boolean(scope.current), 'Scope provided, but no element detected.');
      root = scope.current;
    }

    if (selectorCache) {
      selectorCache[elements] ??= root.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = root.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }

  /**
   * Return an empty array
   */
  return Array.from(elements || []);
}

const visualElementStore = new WeakMap<any, VisualElement>();

function useUnmountEffect(callback: () => void) {
  return useEffect(() => () => callback(), []);
}

function useConstant<T>(init: Init<T>) {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
}

function animateElements(
  elementOrSelector: ElementOrSelector,
  keyframes: DOMKeyframesDefinition,
  options?: DynamicAnimationOptions,
  scope?: AnimationScope,
): AnimationPlaybackControls {
  const elements = resolveElements(elementOrSelector, scope);
  const numElements = elements.length;

  //   invariant(Boolean(numElements), 'No valid element provided.');

  const animations: AnimationPlaybackControls[] = [];

  for (let i = 0; i < numElements; i++) {
    const element = elements[i];

    /**
     * Check each element for an associated VisualElement. If none exists,
     * we need to create one.
     */
    if (!visualElementStore.has(element)) {
      /**
       * TODO: We only need render-specific parts of the VisualElement.
       * With some additional work the size of the animate() function
       * could be reduced significantly.
       */
      createVisualElement(element as HTMLElement | SVGElement);
    }

    const visualElement = visualElementStore.get(element)!;

    const transition = { ...options };

    /**
     * Resolve stagger function if provided.
     */
    if (typeof transition.delay === 'function') {
      transition.delay = transition.delay(i, numElements);
    }

    animations.push(...animateTarget(visualElement, { ...keyframes, transition } as TargetAndTransition, {}));
  }

  return new GroupPlaybackControls(animations);
}

const isSequence = (value: unknown): value is AnimationSequence => Array.isArray(value) && Array.isArray(value[0]);

function animateSequence(sequence: AnimationSequence, options?: SequenceOptions, scope?: AnimationScope) {
  const animations: AnimationPlaybackControls[] = [];
  const animationDefinitions = createAnimationsFromSequence(sequence, options, scope);

  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    let animation: AnimationPlaybackControls;

    if (isMotionValue(subject)) {
      animation = animateSingleValue(subject, keyframes.default, transition.default);
    } else {
      animation = animateElements(subject, keyframes, transition);
    }

    animations.push(animation);
  });

  return new GroupPlaybackControls(animations);
}

export const createScopedAnimate = (scope?: AnimationScope) => {
  /**
   * Animate a single value
   */
  function scopedAnimate<V>(
    from: V,
    to: V | GenericKeyframesTarget<V>,
    options?: ValueAnimationTransition<V>,
  ): AnimationPlaybackControls;
  /**
   * Animate a MotionValue
   */
  function scopedAnimate<V>(
    value: MotionValue<V>,
    keyframes: V | GenericKeyframesTarget<V>,
    options?: ValueAnimationTransition<V>,
  ): AnimationPlaybackControls;
  /**
   * Animate DOM
   */
  function scopedAnimate(
    value: ElementOrSelector,
    keyframes: DOMKeyframesDefinition,
    options?: DynamicAnimationOptions,
  ): AnimationPlaybackControls;
  /**
   * Animate sequences
   */
  function scopedAnimate(sequence: AnimationSequence, options?: SequenceOptions): AnimationPlaybackControls;
  /**
   * Implementation
   */
  function scopedAnimate<V extends string | number>(
    valueOrElementOrSequence: AnimationSequence | ElementOrSelector | MotionValue<V> | V,
    keyframes: SequenceOptions | DOMKeyframesDefinition | V | GenericKeyframesTarget<V>,
    options?: ValueAnimationTransition<V> | DynamicAnimationOptions,
  ): AnimationPlaybackControls {
    let animation: AnimationPlaybackControls;

    if (isSequence(valueOrElementOrSequence)) {
      animation = animateSequence(valueOrElementOrSequence, keyframes as SequenceOptions, scope);
    } else if (isDOMKeyframes(keyframes)) {
      animation = animateElements(
        valueOrElementOrSequence as ElementOrSelector,
        keyframes,
        options as DynamicAnimationOptions | undefined,
        scope,
      );
    } else {
      animation = animateSingleValue(
        valueOrElementOrSequence as MotionValue<V> | V,
        keyframes as V | GenericKeyframesTarget<V>,
        options as ValueAnimationTransition<V> | undefined,
      );
    }

    if (scope) {
      scope.animations.push(animation);
    }

    return animation;
  }

  return scopedAnimate;
};

export const animate = createScopedAnimate();

export function useAnimate<T extends Element = any>() {
  const scope: AnimationScope<T> = useConstant(() => ({
    current: null!, // Will be hydrated by React
    animations: [],
  }));

  const animate = useConstant(() => createScopedAnimate(scope));

  useUnmountEffect(() => {
    scope.animations.forEach((animation) => animation.stop());
  });

  return [scope, animate] as [AnimationScope<T>, typeof animate];
}
