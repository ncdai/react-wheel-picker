"use client";

import "./style.css";

import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useWheelPickerGroup, WheelPickerGroupProvider } from "./context";
import type {
  WheelPickerOption,
  WheelPickerProps,
  WheelPickerValue,
  WheelPickerWrapperProps,
} from "./types";
import { useControllableState } from "./use-controllable-state";
import { useTypeaheadSearch } from "./use-typeahead-search";

const RESISTANCE = 0.3; // Resistance when scrolling above the top or below the bottom
const MAX_VELOCITY = 30; // Maximum velocity for the scroll animation

const easeOutCubic = (p: number) => Math.pow(p - 1, 3) + 1;

// Clamp utility to constrain a value within bounds
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

// Get text value from option for type-ahead search
const getOptionTextValue = <T extends WheelPickerValue>(
  option: WheelPickerOption<T>
): string => {
  return (
    option.textValue ??
    (typeof option.label === "string" ? option.label : String(option.value))
  );
};

const WheelPickerWrapper: React.FC<WheelPickerWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <WheelPickerGroupProvider>
      <div className={className} data-rwp-wrapper>
        {children}
      </div>
    </WheelPickerGroupProvider>
  );
};

function WheelPicker<T extends WheelPickerValue>({
  defaultValue,
  value: valueProp,
  onValueChange,

  options: optionsProp,
  infinite: infiniteProp = false,
  visibleCount: countProp = 20,
  dragSensitivity: dragSensitivityProp = 3,
  scrollSensitivity: scrollSensitivityProp = 5,
  optionItemHeight: optionHeightProp = 30,
  classNames,
}: WheelPickerProps<T>) {
  const [value = optionsProp[0]?.value, setValue] = useControllableState<T>({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  const options = useMemo<WheelPickerOption<T>[]>(() => {
    if (!infiniteProp) {
      return optionsProp;
    }

    const result: WheelPickerOption<T>[] = [];
    const halfCount = Math.ceil(countProp / 2);

    if (optionsProp.length === 0) {
      return result;
    }

    while (result.length < halfCount) {
      result.push(...optionsProp);
    }

    return result;
  }, [countProp, optionsProp, infiniteProp]);

  const itemHeight = optionHeightProp;
  const halfItemHeight = itemHeight * 0.5;
  const itemAngle = 360 / countProp;
  const radius = itemHeight / Math.tan((itemAngle * Math.PI) / 180);
  const containerHeight = Math.round(radius * 2 + itemHeight * 0.25);
  const quarterCount = countProp >> 2; // Divide by 4
  const baseDeceleration = dragSensitivityProp * 10;
  const snapBackDeceleration = 10;

  const containerRef = useRef<HTMLDivElement>(null);
  const wheelItemsRef = useRef<HTMLUListElement>(null);
  const highlightListRef = useRef<HTMLUListElement>(null);

  const scrollRef = useRef(0);
  const moveId = useRef(0);
  const dragingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  const [isFocused, setIsFocused] = useState(false);
  const pickerIndexRef = useRef(-1);

  const group = useWheelPickerGroup();

  // Register picker with group context (sync, using ref callback pattern)
  const containerRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;

      if (node && group) {
        // Always register when node exists (handles React Strict Mode re-mount)
        const existingIndex =
          pickerIndexRef.current === -1 ? null : pickerIndexRef.current;
        pickerIndexRef.current = group.register(existingIndex, node);
      }
      // Note: We don't unregister on unmount to avoid React Strict Mode issues
      // The Map will be garbage collected when the Provider unmounts
    },
    [group]
  );

  const touchDataRef = useRef<{
    startY: number;
    yList: [number, number][];
    touchScroll?: number;
    isClick?: boolean;
  }>({
    startY: 0,
    yList: [],
    touchScroll: 0,
    isClick: true,
  });

  const dragControllerRef = useRef<AbortController | null>(null);

  const renderWheelItems = useMemo(() => {
    const renderItem = (
      item: WheelPickerOption<T>,
      index: number,
      angle: number
    ) => (
      <li
        key={index}
        className={classNames?.optionItem}
        data-slot="option-item"
        data-rwp-option
        data-index={index}
        style={{
          top: -halfItemHeight,
          height: itemHeight,
          lineHeight: `${itemHeight}px`,
          transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
          visibility: "hidden",
        }}
      >
        {item.label}
      </li>
    );

    const items = options.map((option, index) =>
      renderItem(option, index, -itemAngle * index)
    );

    if (infiniteProp) {
      for (let i = 0; i < quarterCount; ++i) {
        const prependIndex = -i - 1;
        const appendIndex = i + options.length;

        items.unshift(
          renderItem(
            options[options.length - i - 1],
            prependIndex,
            itemAngle * (i + 1)
          )
        );
        items.push(
          renderItem(options[i], appendIndex, -itemAngle * appendIndex)
        );
      }
    }

    return items;
  }, [
    itemHeight,
    halfItemHeight,
    infiniteProp,
    itemAngle,
    options,
    quarterCount,
    radius,
    classNames?.optionItem,
  ]);

  const renderHighlightItems = useMemo(() => {
    const renderItem = (item: WheelPickerOption<T>, key: React.Key) => (
      <li
        key={key}
        className={classNames?.highlightItem}
        data-slot="highlight-item"
        data-rwp-highlight-item
        style={{ height: itemHeight }}
      >
        {item.label}
      </li>
    );

    const items = options.map((option, index) => renderItem(option, index));

    if (infiniteProp) {
      const firstItem = options[0];
      const lastItem = options[options.length - 1];

      items.unshift(renderItem(lastItem, "infinite-start"));
      items.push(renderItem(firstItem, "infinite-end"));
    }

    return items;
  }, [classNames?.highlightItem, itemHeight, infiniteProp, options]);

  const wheelSegmentPositions = useMemo(() => {
    let positionAlongWheel = 0;
    const degToRad = Math.PI / 180;

    const segmentRanges: [number, number][] = [];

    for (let i = quarterCount - 1; i >= -quarterCount + 1; --i) {
      const angle = i * itemAngle;
      const segmentLength = itemHeight * Math.cos(angle * degToRad);
      const start = positionAlongWheel;
      positionAlongWheel += segmentLength;
      segmentRanges.push([start, positionAlongWheel]);
    }

    return segmentRanges;
  }, [itemAngle, itemHeight, quarterCount]);

  const normalizeScroll = (scroll: number) =>
    ((scroll % options.length) + options.length) % options.length;

  const scrollTo = (scroll: number) => {
    const normalizedScroll = infiniteProp ? normalizeScroll(scroll) : scroll;

    if (wheelItemsRef.current) {
      const transform = `translateZ(${-radius}px) rotateX(${itemAngle * normalizedScroll}deg)`;
      wheelItemsRef.current.style.transform = transform;

      wheelItemsRef.current.childNodes.forEach((node) => {
        const li = node as HTMLLIElement;
        const distance = Math.abs(Number(li.dataset.index) - normalizedScroll);
        li.style.visibility = distance > quarterCount ? "hidden" : "visible";
      });
    }

    if (highlightListRef.current) {
      highlightListRef.current.style.transform = `translateY(${-normalizedScroll * itemHeight}px)`;
    }

    return normalizedScroll;
  };

  const cancelAnimation = () => {
    cancelAnimationFrame(moveId.current);
  };

  const animateScroll = (
    startScroll: number,
    endScroll: number,
    duration: number,
    onComplete?: () => void
  ) => {
    if (startScroll === endScroll || duration === 0) {
      scrollTo(startScroll);
      return;
    }

    const startTime = performance.now();
    const totalDistance = endScroll - startScroll;

    const tick = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;

      if (elapsed < duration) {
        const progress = easeOutCubic(elapsed / duration);
        scrollRef.current = scrollTo(startScroll + progress * totalDistance);
        moveId.current = requestAnimationFrame(tick);
      } else {
        cancelAnimation();
        scrollRef.current = scrollTo(endScroll);
        onComplete?.();
      }
    };

    requestAnimationFrame(tick);
  };

  const selectByScroll = (scroll: number) => {
    const normalized = normalizeScroll(scroll) | 0;

    const boundedScroll = infiniteProp
      ? normalized
      : Math.min(Math.max(normalized, 0), options.length - 1);

    if (!infiniteProp && boundedScroll !== scroll) return;

    scrollRef.current = scrollTo(boundedScroll);
    const selected = options[scrollRef.current];
    setValue(selected.value);
  };

  const selectByValue = (value: T) => {
    const index = options.findIndex((opt) => opt.value === value);

    if (index === -1) {
      console.error("Invalid value selected:", value);
      return;
    }

    cancelAnimation();
    selectByScroll(index);
  };

  const scrollByStep = (step: number) => {
    const startScroll = scrollRef.current;
    let endScroll = startScroll + step;

    if (infiniteProp) {
      endScroll = Math.round(endScroll);
    } else {
      endScroll = clamp(Math.round(endScroll), 0, options.length - 1);
    }

    const distance = Math.abs(endScroll - startScroll);
    if (distance === 0) return;

    const duration = Math.sqrt(distance / scrollSensitivityProp);

    cancelAnimation();
    animateScroll(startScroll, endScroll, duration, () => {
      selectByScroll(scrollRef.current);
    });
  };

  const handleWheelItemClick = (clientY: number) => {
    const container = containerRef.current;
    if (!container) {
      console.error("Container reference is not set.");
      return;
    }

    const { top } = container.getBoundingClientRect();
    const clickOffsetY = clientY - top;

    const clickedSegmentIndex = wheelSegmentPositions.findIndex(
      ([start, end]) => clickOffsetY >= start && clickOffsetY <= end
    );

    if (clickedSegmentIndex === -1) {
      console.error("No item found for click position:", clickOffsetY);
      return;
    }

    const stepsToScroll = (quarterCount - clickedSegmentIndex - 1) * -1;
    scrollByStep(stepsToScroll);
  };

  const updateScrollDuringDrag = (e: MouseEvent | TouchEvent) => {
    try {
      const currentY =
        (e instanceof MouseEvent ? e.clientY : e.touches?.[0]?.clientY) || 0;

      const touchData = touchDataRef.current;

      // If this is the first move after mousedown, check if it's a drag
      if (touchData.isClick) {
        const dragThreshold = 5; // pixels
        if (Math.abs(currentY - touchData.startY) > dragThreshold) {
          touchData.isClick = false;
        }
      }

      // Record current Y position with timestamp
      touchData.yList.push([currentY, Date.now()]);
      if (touchData.yList.length > 5) {
        touchData.yList.shift(); // Keep latest 5 points for velocity calc
      }

      // Calculate delta in scroll position based on drag distance
      const dragDelta = (touchData.startY - currentY) / itemHeight;
      let nextScroll = scrollRef.current + dragDelta;

      if (infiniteProp) {
        // Wrap scroll for infinite lists
        nextScroll = normalizeScroll(nextScroll);
      } else {
        const maxIndex = options.length;
        if (nextScroll < 0) {
          // Apply resistance when dragging above top
          nextScroll *= RESISTANCE;
        } else if (nextScroll > maxIndex) {
          // Apply resistance when dragging below bottom
          nextScroll = maxIndex + (nextScroll - maxIndex) * RESISTANCE;
        }
      }

      // Update visual scroll and store position
      touchData.touchScroll = scrollTo(nextScroll);
    } catch (error) {
      console.error("Error in updateScrollDuringDrag:", error);
    }
  };

  const handleDragMoveEvent = (event: MouseEvent | TouchEvent) => {
    if (
      !dragingRef.current &&
      !containerRef.current?.contains(event.target as Node) &&
      event.target !== containerRef.current
    ) {
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    if (options.length) {
      updateScrollDuringDrag(event);
    }
  };

  const initiateDragGesture = (event: MouseEvent | TouchEvent) => {
    try {
      dragingRef.current = true;

      const controller = new AbortController();
      const { signal } = controller;

      dragControllerRef.current = controller;

      // Listen to movement events
      const passiveOpts = { signal, passive: false };
      containerRef.current?.addEventListener(
        "touchmove",
        handleDragMoveEvent,
        passiveOpts
      );
      document.addEventListener("mousemove", handleDragMoveEvent, passiveOpts);

      const startY =
        (event instanceof MouseEvent
          ? event.clientY
          : event.touches?.[0]?.clientY) || 0;

      // Initialize touch tracking
      const touchData = touchDataRef.current;
      touchData.startY = startY;
      touchData.yList = [[startY, Date.now()]];
      touchData.touchScroll = scrollRef.current;
      touchData.isClick = true;

      // Stop any ongoing scroll animation
      cancelAnimation();
    } catch (error) {
      console.error("Error in initiateDragGesture:", error);
    }
  };

  const handleDragStartEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const isDragging = dragingRef.current;
      const isTargetValid =
        !!containerRef.current?.contains(e.target as Node) ||
        e.target === containerRef.current;

      if ((isDragging || isTargetValid) && e.cancelable) {
        e.preventDefault();
        if (options.length) {
          initiateDragGesture(e);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initiateDragGesture]
  );

  const decelerateAndAnimateScroll = (initialVelocity: number) => {
    const currentScroll = scrollRef.current;
    let targetScroll = currentScroll;
    let deceleration =
      initialVelocity > 0 ? -baseDeceleration : baseDeceleration;
    let duration = 0;

    if (infiniteProp) {
      // Infinite mode: apply uniform deceleration to calculate scroll distance
      duration = Math.abs(initialVelocity / deceleration);
      const scrollDistance =
        initialVelocity * duration + 0.5 * deceleration * duration * duration;
      targetScroll = Math.round(currentScroll + scrollDistance);
    } else if (currentScroll < 0 || currentScroll > options.length - 1) {
      // Out-of-bounds: snap back to nearest valid scroll index
      const target = clamp(currentScroll, 0, options.length - 1);
      const scrollDistance = currentScroll - target;
      deceleration = snapBackDeceleration;
      duration = Math.sqrt(Math.abs(scrollDistance / deceleration));
      initialVelocity = deceleration * duration;
      initialVelocity = currentScroll > 0 ? -initialVelocity : initialVelocity;
      targetScroll = target;
    } else {
      // Normal decelerated scroll within bounds
      duration = Math.abs(initialVelocity / deceleration);
      const scrollDistance =
        initialVelocity * duration + 0.5 * deceleration * duration * duration;
      targetScroll = Math.round(currentScroll + scrollDistance);
      targetScroll = clamp(targetScroll, 0, options.length - 1);

      const adjustedDistance = targetScroll - currentScroll;
      duration = Math.sqrt(Math.abs(adjustedDistance / deceleration));
    }

    // Start animation to target scroll position with calculated duration
    animateScroll(currentScroll, targetScroll, duration, () => {
      selectByScroll(scrollRef.current); // Ensure selected item updates at end
    });

    // Fallback selection update (in case animation callback fails)
    selectByScroll(scrollRef.current);
  };

  const finalizeDragAndStartInertiaScroll = () => {
    try {
      dragControllerRef.current?.abort();
      dragControllerRef.current = null;

      const touchData = touchDataRef.current;

      // If it was a click (no significant movement), handle it as a click
      if (touchData.isClick) {
        handleWheelItemClick(touchData.startY);
        return;
      }

      const yList = touchData.yList;
      let velocity = 0;

      if (yList.length > 1) {
        const len = yList.length;
        const [startY, startTime] = yList[len - 2] ?? [0, 0];
        const [endY, endTime] = yList[len - 1] ?? [0, 0];

        const timeDiff = endTime - startTime;

        if (timeDiff > 0) {
          const distance = startY - endY;
          const velocityPerSecond = ((distance / itemHeight) * 1000) / timeDiff;

          const maxVelocity = MAX_VELOCITY;
          const direction = velocityPerSecond > 0 ? 1 : -1;
          const absVelocity = Math.min(
            Math.abs(velocityPerSecond),
            maxVelocity
          );
          velocity = absVelocity * direction;
        }
      }

      scrollRef.current = touchData.touchScroll ?? scrollRef.current;
      decelerateAndAnimateScroll(velocity);
    } catch (error) {
      console.error("Error in finalizeDragAndStartInertiaScroll:", error);
    } finally {
      dragingRef.current = false;
    }
  };

  const handleDragEndEvent = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!options.length) return;

      const isDragging = dragingRef.current;
      const isTargetValid =
        !!containerRef.current?.contains(event.target as Node) ||
        event.target === containerRef.current;

      if ((isDragging || isTargetValid) && event.cancelable) {
        event.preventDefault();
        finalizeDragAndStartInertiaScroll();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [finalizeDragAndStartInertiaScroll]
  );

  const scrollByWheel = (event: WheelEvent) => {
    event.preventDefault();

    const now = Date.now();
    if (now - lastWheelTimeRef.current < 100) return;

    const direction = Math.sign(event.deltaY);
    if (!direction) return;

    lastWheelTimeRef.current = now;

    scrollByStep(direction);
  };

  const handleWheelEvent = useCallback(
    (event: WheelEvent) => {
      if (!options.length || !containerRef.current) return;

      const isDragging = dragingRef.current;
      const isTargetValid =
        containerRef.current.contains(event.target as Node) ||
        event.target === containerRef.current;

      if ((isDragging || isTargetValid) && event.cancelable) {
        event.preventDefault();
        scrollByWheel(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollByWheel]
  );

  const navigateToPicker = useCallback(
    (direction: "prev" | "next") => {
      const pickerIndex = pickerIndexRef.current;
      if (!group || pickerIndex === -1) return;

      const sortedIndices = group.getPickerIndices();
      const currentPos = sortedIndices.indexOf(pickerIndex);

      if (currentPos === -1) return;

      let targetPos: number;
      if (direction === "prev") {
        targetPos = currentPos > 0 ? currentPos - 1 : sortedIndices.length - 1;
      } else {
        targetPos = currentPos < sortedIndices.length - 1 ? currentPos + 1 : 0;
      }

      const targetIndex = sortedIndices[targetPos];
      const targetRef = group.getPickerRef(targetIndex);

      if (targetRef) {
        // Update tabIndex directly on DOM before focusing (React state update is async)
        const currentRef = containerRef.current;
        if (currentRef) {
          currentRef.tabIndex = -1;
        }
        targetRef.tabIndex = 0;

        group.setActiveIndex(targetIndex);
        targetRef.focus();
      }
    },
    [group]
  );

  const { handleTypeaheadSearch, resetTypeahead } = useTypeaheadSearch(
    options,
    {
      getTextValue: getOptionTextValue,
      getCurrentIndex: useCallback(() => Math.round(scrollRef.current), []),
      onMatch: useCallback(
        (matchIndex: number) => {
          const step = matchIndex - Math.round(scrollRef.current);
          scrollByStep(step);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
      ),
    }
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!options.length) return;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          scrollByStep(-1);
          break;

        case "ArrowDown":
          event.preventDefault();
          scrollByStep(1);
          break;

        case "ArrowLeft":
          event.preventDefault();
          navigateToPicker("prev");
          break;

        case "ArrowRight":
          event.preventDefault();
          navigateToPicker("next");
          break;

        case "Home":
          if (!infiniteProp) {
            event.preventDefault();
            scrollByStep(-scrollRef.current);
          }
          break;

        case "End":
          if (!infiniteProp) {
            event.preventDefault();
            scrollByStep(options.length - 1 - scrollRef.current);
          }
          break;

        default:
          // Type-ahead search: handle printable characters
          if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
          ) {
            event.preventDefault();
            handleTypeaheadSearch(event.key);
          }
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.length, infiniteProp, navigateToPicker, handleTypeaheadSearch]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    const pickerIndex = pickerIndexRef.current;
    if (group && pickerIndex !== -1) {
      group.setActiveIndex(pickerIndex);
    }
  }, [group]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Clear search buffer on blur
    resetTypeahead();
  }, [resetTypeahead]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const opts = { passive: false };

    container.addEventListener("touchstart", handleDragStartEvent, opts);
    container.addEventListener("touchend", handleDragEndEvent, opts);
    container.addEventListener("wheel", handleWheelEvent, opts);
    document.addEventListener("mousedown", handleDragStartEvent, opts);
    document.addEventListener("mouseup", handleDragEndEvent, opts);

    return () => {
      container.removeEventListener("touchstart", handleDragStartEvent);
      container.removeEventListener("touchend", handleDragEndEvent);
      container.removeEventListener("wheel", handleWheelEvent);
      document.removeEventListener("mousedown", handleDragStartEvent);
      document.removeEventListener("mouseup", handleDragEndEvent);
    };
  }, [handleDragEndEvent, handleDragStartEvent, handleWheelEvent]);

  useEffect(() => {
    selectByValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, valueProp, options]); // selected value is changed when options are changed

  // Determine tabIndex: if in group, only active picker is focusable
  const pickerIndex = pickerIndexRef.current;
  const activeIndex = group?.activeIndex ?? -1;
  const tabIndex =
    group && pickerIndex !== -1 ? (activeIndex === pickerIndex ? 0 : -1) : 0;

  return (
    <div
      ref={containerRefCallback}
      data-rwp
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ height: containerHeight }}
    >
      <ul ref={wheelItemsRef} data-rwp-options>
        {renderWheelItems}
      </ul>

      <div
        className={classNames?.highlightWrapper}
        data-rwp-highlight-wrapper
        data-rwp-focused={isFocused || undefined}
        data-slot="highlight-wrapper"
        style={{
          height: itemHeight,
          lineHeight: `${itemHeight}px`,
        }}
      >
        <ul
          ref={highlightListRef}
          data-rwp-highlight-list
          style={{
            top: infiniteProp ? -itemHeight : undefined,
          }}
        >
          {renderHighlightItems}
        </ul>
      </div>
    </div>
  );
}

export {
  WheelPicker,
  type WheelPickerOption,
  type WheelPickerProps,
  type WheelPickerValue,
  WheelPickerWrapper,
};

export { type WheelPickerClassNames } from "./types";
