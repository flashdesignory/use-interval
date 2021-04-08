import {useEffect, useRef, useState} from 'react';

export const useIntervalWithLimit = (
  callback: () => void, 
  delay: number | null, 
  limit: number | null, 
  onComplete?: () => void | null
) => {
  const [startTime] = useState(Date.now());
  const savedCallback = useRef(callback);
  const savedOnComplete = useRef(onComplete);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedOnComplete.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      if (limit !== null) {
        const now = Date.now();
        const difference = now - startTime;
        if (difference > limit) {
          /* istanbul ignore next */
          if (id !== null) clearInterval(id)
          if (savedOnComplete.current) savedOnComplete.current();
          return;
        }
      }

      savedCallback.current();
    };

    const id = setInterval((tick), delay)
    return () => clearInterval(id)
  }, [delay, limit, startTime]);
};
