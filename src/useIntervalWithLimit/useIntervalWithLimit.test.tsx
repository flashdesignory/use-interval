import { render } from '@testing-library/react';

import useIntervalWithLimit from './index';

type TestComponentProps = {
  callback: () => {}
  delay: number | null;
  limit: number | null;
  onComplete?: () => void | null;
}

const TestComponent = ({callback, delay, limit, onComplete}: TestComponentProps): JSX.Element => {
  useIntervalWithLimit(callback, delay, limit, onComplete);
  
  return (
    <div>TestComponent</div>
  )
}

describe('useIntervalWithLimit', () => {
  let callback: jest.Mock;
  let onComplete: jest.Mock;
  const originalDateNow = Date.now;

  beforeEach(() => {
    callback = jest.fn();
    onComplete = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    callback.mockRestore();
    onComplete.mockRestore();
    jest.useRealTimers();
    Date.now = originalDateNow;
  })

  it('does not call the callback if delay is null', () => {
    render(<TestComponent callback={callback} delay={null} limit={200}/>);
    jest.advanceTimersByTime(3);
    expect(callback).not.toBeCalled();
  });

  it('calls the callback in a set delay until limit is reached and calls onComplete', () => {
    let now = Date.now();
    render(<TestComponent callback={callback} delay={1000} limit={4000} onComplete={onComplete} />);
    expect(callback).not.toBeCalled();
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    expect(onComplete).toHaveBeenCalled();
  });

  it('ignores limit if limit is set to null', () => {
    let now = Date.now();
    render(<TestComponent callback={callback} delay={1000} limit={null} onComplete={onComplete} />);
    expect(callback).not.toBeCalled();
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('calls the callback in a set delay until limit is reached and does not call onComplete', () => {
    let now = Date.now();
    render(<TestComponent callback={callback} delay={1000} limit={4000} />);
    expect(callback).not.toBeCalled();
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    now += 1000;
    Date.now = jest.fn(() => now);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
