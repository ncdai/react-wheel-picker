# @ncdai/react-wheel-picker

## 1.1.0

### Minor Changes

- 155a951: Add full keyboard navigation and type-ahead search support

  ### New Features

  - **Keyboard Navigation**: Navigate options using Arrow keys

    - `ArrowUp` / `ArrowDown`: Move between options
    - `ArrowLeft` / `ArrowRight`: Move focus between pickers in a group
    - `Home` / `End`: Jump to first/last option (non-infinite mode)

  - **Type-ahead Search**: Quickly jump to options by typing

    - Single character cycles through matching options
    - Multi-character search finds options starting with the typed string
    - 500ms timeout to reset search buffer

  - **Focus Management**: Visual focus indicator with `data-rwp-focused` attribute
    - Roving tabindex for picker groups
    - Proper focus/blur handling

  ### API Changes

  - Added `textValue` property to `WheelPickerOption` type for custom search text (useful when `label` is a ReactNode)
  - Added `data-rwp-focused` data attribute on `[data-rwp-highlight-wrapper]` when picker is focused

## 1.0.19

### Patch Changes

- 4f4bef0: docs(README.md): update Vercel OSS Program badge URL to new asset location for improved reliability and future-proofing

## 1.0.18

### Patch Changes

- ab23b5e: feat: add support for generic option and values

## 1.0.17

### Patch Changes

- 8c9d4a8: fix(react-wheel-picker): clean up event handlers when component is unmounted

## 1.0.16

### Patch Changes

- d6c8ed6: feat(react-wheel-picker): add scrollSensitivity prop to WheelPicker ([#73](https://github.com/ncdai/react-wheel-picker/issues/73))

## 1.0.15

### Patch Changes

- 8ae2379: style(react-wheel-picker): remove redundant list-style declarations and add reset styles for ul and li elements to ensure consistent styling across different browsers

## 1.0.14

### Patch Changes

- 27f5df9: fix: sync selected value position when options change dynamically

## 1.0.13

### Patch Changes

- aa78962: feat(react-wheel-picker): add click-to-select functionality

  Introduce click-to-select feature by calculating segment positions
  and handling click events to select items. This enhances user
  interaction by allowing direct item selection via clicks.

  fix(react-wheel-picker): update cursor style to default

  Change cursor style from 'ns-resize' to 'default' to better reflect
  the interaction model and improve user experience.

## 1.0.12

### Patch Changes

- 31df052: feat(WheelPicker): add optionItemHeight prop for customizable item height

  fix(WheelPicker): update label type to ReactNode for more flexibility

  style(WheelPicker): improve CSS for better alignment and centering

## 1.0.11

### Patch Changes

- 0e43cff: - docs(README.md): update live demo URL for better accessibilityAdd commentMore actions
  - docs(README.md): improve documentation link text for clarity
  - docs(react-wheel-picker/README.md): remove usage section to streamline README and avoid redundancy with documentation

## 1.0.10

### Patch Changes

- fb20e19: docs(README.md): update live demo URL for better accessibility
  docs(README.md): improve documentation link text for clarity
  docs(react-wheel-picker/README.md): remove usage section to streamline README and avoid redundancy with documentation

## 1.0.9

### Patch Changes

- e456552: Improve scroll behavior with smooth animation.

## 1.0.8

### Patch Changes

- 725e4ec: Improve scroll behavior with smooth animation.

## 1.0.7

### Patch Changes

- a4693cc: test changesets
