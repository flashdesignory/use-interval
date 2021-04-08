import { render } from '@testing-library/react';

import useInterval from './index';

type TestComponentProps = {
  callback: () => {}
  delay: number | null;
}

const TestComponent = ({callback, delay}: TestComponentProps): JSX.Element => {
  useInterval(callback, delay);
  return (
    <div>TestComponent</div>
  )
}

describe('useInterval', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    callback.mockRestore();
    jest.useRealTimers();
  })

  it('does not call the callback if delay is null', () => {
    render(<TestComponent callback={callback} delay={null} />);
    jest.advanceTimersByTime(3);
    expect(callback).not.toBeCalled();
  });

  it('calls the callback in a set delay', () => {
    render(<TestComponent callback={callback} delay={200} />);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(199);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('stops the callback if delay is changed to null', () => {
    callback = jest.fn();
    const {rerender} = render(<TestComponent callback={callback} delay={200} />);
    jest.advanceTimersByTime(600);
    expect(callback).toHaveBeenCalledTimes(3);
    rerender(<TestComponent callback={callback} delay={null} />)
    jest.advanceTimersByTime(600);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
