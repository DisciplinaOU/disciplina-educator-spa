/* eslint-disable import/prefer-default-export */
import { useState } from "react";

export const usePersistanceState = (defaultValue, key) => {
  const persistedValue = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : undefined;
  const [_state, _setState] = useState(persistedValue === undefined ? defaultValue : persistedValue);

  const setState = value => {
    _setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [_state, setState];
};
