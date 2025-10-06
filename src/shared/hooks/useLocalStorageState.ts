import React from "react";
import { safeJsonParse } from "../lib/utils";

const useLocalStorageState = <StateType>(
  initialValue: StateType,
  localStorageKey: string,
  localStorageParser?: (value: string) => StateType
) => {
  const [state, setState] = React.useState<StateType>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    const storedValue = localStorage.getItem(localStorageKey);
    if (storedValue) {
      const parsedValue = localStorageParser
        ? localStorageParser(storedValue)
        : safeJsonParse<StateType>(storedValue);

      return parsedValue as StateType;
    }
    return initialValue;
  });

  const setLocalStorageState = (
    update: StateType | ((prevState: StateType) => StateType)
  ) => {
    setState((prevState: StateType) => {
      const nextState =
        typeof update === "function"
          ? (update as (prev: StateType) => StateType)(prevState)
          : update;
      localStorage.setItem(localStorageKey, JSON.stringify(nextState));
      return nextState;
    });
  };

  return [state, setLocalStorageState] as const;
};

export default useLocalStorageState;
