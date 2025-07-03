import { useEffect, useRef, useState } from "react";

/**
 * useDebounceValue
 *
 * A hook which returns a debounced version of the given value.
 *
 * @param {string | number} value The value to debounce.
 * @param {number} ms The number of milliseconds to debounce for.
 * @returns {any} The debounced value.
 */
const useDebounceValue = (value: string, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerId = useRef<ReturnType<typeof setTimeout>>(null);
  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);
  }, [ms, value]);

  return debouncedValue;
};

export default useDebounceValue;
