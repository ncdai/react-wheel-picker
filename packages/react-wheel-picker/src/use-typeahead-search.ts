import { useCallback, useRef } from "react";

const TYPEAHEAD_TIMEOUT_MS = 500;

type UseTypeaheadSearchOptions<T> = {
  /** Function to get text value for comparison from an option */
  getTextValue: (option: T) => string;
  /** Function to get current selected index */
  getCurrentIndex: () => number;
  /** Callback when a match is found */
  onMatch: (index: number) => void;
};

/**
 * Hook for type-ahead search functionality in list-based components.
 *
 * Features:
 * - Accumulates typed characters within a timeout window
 * - Cycles through matching items when single character is repeated (e.g., "a", "aa", "aaa")
 * - Searches from beginning for multi-character queries
 *
 * @example
 * ```tsx
 * const { handleTypeaheadSearch, resetTypeahead } = useTypeaheadSearch({
 *   getTextValue: (option) => option.label,
 *   getCurrentIndex: () => currentIndex,
 *   onMatch: (index) => scrollToIndex(index),
 * });
 * ```
 */
export function useTypeaheadSearch<T>(
  options: T[],
  { getTextValue, getCurrentIndex, onMatch }: UseTypeaheadSearchOptions<T>
) {
  const searchBufferRef = useRef("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTypeahead = useCallback(() => {
    searchBufferRef.current = "";
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleTypeaheadSearch = useCallback(
    (char: string) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Append character to search buffer
      searchBufferRef.current += char.toLowerCase();
      const searchTerm = searchBufferRef.current;

      // Check if all characters in search are the same (e.g., "aa", "aaa")
      const isRepeated =
        searchTerm.length > 1 &&
        Array.from(searchTerm).every((c) => c === searchTerm[0]);

      // If repeated, normalize to single character for cycling behavior
      const normalizedSearch = isRepeated ? searchTerm[0] : searchTerm;

      // Get current index
      const currentIndex = getCurrentIndex();

      // For single character search (or repeated), cycle through matches starting from current position
      const shouldCycle = normalizedSearch.length === 1;

      let matchIndex = -1;

      if (shouldCycle) {
        // Search from after current position first, then wrap around
        for (let i = 1; i <= options.length; i++) {
          const index = (currentIndex + i) % options.length;
          const text = getTextValue(options[index]);
          if (text.toLowerCase().startsWith(normalizedSearch)) {
            matchIndex = index;
            break;
          }
        }
      } else {
        // Multi-character search: find first match from beginning
        matchIndex = options.findIndex((option) => {
          const text = getTextValue(option);
          return text.toLowerCase().startsWith(normalizedSearch);
        });
      }

      if (matchIndex !== -1) {
        onMatch(matchIndex);
      }

      // Clear buffer after timeout
      timeoutRef.current = setTimeout(() => {
        searchBufferRef.current = "";
        timeoutRef.current = null;
      }, TYPEAHEAD_TIMEOUT_MS);
    },
    [options, getTextValue, getCurrentIndex, onMatch]
  );

  return {
    handleTypeaheadSearch,
    resetTypeahead,
  };
}
