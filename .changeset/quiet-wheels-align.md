---
"@ncdai/react-wheel-picker": patch
---

Truncate overflowing text and inline React labels with an ellipsis in both wheel options and the highlighted selection. This prevents long text from overlapping adjacent rows or being clipped at both ends in narrow pickers. Custom labels with block or flex layouts remain responsible for truncating their inner text.

Compatibility note: labels are now wrapped in a `div[data-rwp-label]` inside both `[data-rwp-option]` and `[data-rwp-highlight-item]`. CSS selectors such as `[data-rwp-option] > span` must include the new wrapper (for example, `[data-rwp-option] > [data-rwp-label] > span`). Selectors such as `.option-item > *` now target the wrapper rather than the label elements. Custom layouts that rely on labels being direct flex children of the option item may also need adjustment. The `data-rwp-label` attribute is documented as a styling hook for the new container.
