---
"@ncdai/react-wheel-picker": minor
---

Add support for disabled options in wheel picker

This release adds comprehensive support for disabled options in the wheel picker component:

- **New `disabled` property**: Added optional `disabled` boolean property to `WheelPickerOption` type to mark options as non-selectable
- **Smart navigation**: Automatically skips disabled items when scrolling, using keyboard navigation, or interacting with the picker
- **Nearest enabled selection**: When a disabled item is encountered, the picker intelligently finds and selects the nearest enabled option in the scroll direction
- **Keyboard accessibility**: Arrow keys, Home, and End keys now properly skip over disabled options
- **Typeahead search**: Type-ahead search now only searches through enabled options
- **Visual feedback**: Added `data-disabled` attribute for styling disabled items with reduced opacity and disabled pointer events
- **Example updates**: Updated documentation and examples to demonstrate disabled option usage

This enhancement maintains backward compatibility - existing implementations will continue to work without changes.
