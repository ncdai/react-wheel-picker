import type { ReactNode } from "react";

/**
 * Represents the value of a single option in the wheel picker
 */
export type WheelPickerValue = string | number;

/**
 * Represents a single option in the wheel picker
 */
export type WheelPickerOption<T extends WheelPickerValue = string> = {
  /** The value that will be returned when this option is selected */
  value: T;
  /** The content displayed for this option */
  label: ReactNode;
  /** Optional text for type-ahead search (useful when label is a ReactNode). Defaults to label if string, otherwise value. */
  textValue?: string;
};

/**
 * Custom class names for styling different parts of the wheel picker
 */
export type WheelPickerClassNames = {
  /** Class name for individual option items */
  optionItem?: string;
  /** Class name for the wrapper of the highlighted area */
  highlightWrapper?: string;
  /** Class name for the highlighted item */
  highlightItem?: string;
};

/**
 * Props for the WheelPicker component
 */
export type WheelPickerProps<T extends WheelPickerValue = string> = {
  /** Initial value of the picker when uncontrolled */
  defaultValue?: T;
  /** Current value of the picker when controlled */
  value?: T;
  /** Callback fired when the selected value changes */
  onValueChange?: (value: T) => void;

  /** Array of options to display in the wheel */
  options: WheelPickerOption<T>[];
  /** Whether the wheel should loop infinitely */
  infinite?: boolean;
  /** The number of options visible on the circular ring, must be a multiple of 4 */
  visibleCount?: number;
  /** Sensitivity of the drag interaction (higher = more sensitive) */
  dragSensitivity?: number;
  /** Sensitivity of the scroll interaction (higher = more sensitive) */
  scrollSensitivity?: number;
  /** Height (in pixels) of each item in the picker list */
  optionItemHeight?: number;
  /** Custom class names for styling different parts of the wheel */
  classNames?: WheelPickerClassNames;
};

/**
 * Props for the WheelPicker wrapper component
 */
export type WheelPickerWrapperProps = {
  /** Additional CSS class name for the wrapper */
  className?: string;
  /** Child elements to be rendered inside the wrapper */
  children: ReactNode;
};
