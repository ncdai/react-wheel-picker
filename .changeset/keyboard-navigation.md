---
"@ncdai/react-wheel-picker": minor
---

Add full keyboard navigation and type-ahead search support

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
