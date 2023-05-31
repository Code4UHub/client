import { useState } from 'react';

type Props = {
  initial?: number;
};

export const useIndex = ({ initial }: Props) => {
  const [index, setIndex] = useState(initial || 0);
  const [max, setMax] = useState(0);

  // Returns true if operation was possible
  function next(): boolean {
    if (index < max) {
      setIndex(index + 1);
      return true;
    }
    return false;
  }

  function prev(): boolean {
    if (index > 0) {
      setIndex(index - 1);
      return true;
    }
    return false;
  }

  function jumpTo(value: number): boolean {
    if (value >= 0 && value <= max) {
      setIndex(value);
      return true;
    }
    return false;
  }

  function setMaxIndex(value: number) {
    setMax(value);
  }

  return {
    index,
    max,
    next,
    prev,
    jumpTo,
    setMaxIndex,
  };
};
