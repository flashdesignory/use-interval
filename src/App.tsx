import React, { useState } from 'react';
import useInterval from './useInterval';
import useIntervalWithLimit from './useIntervalWithLimit';
import logo from './logo.svg';
import './App.css';

type CounterProps = {
  delay: number | null;
}

/* istanbul ignore next */
const Counter = ({delay}: CounterProps) => {
  let [count, setCount] = useState(1);
  
  useInterval(() => {
    setCount(count + 1);
  }, delay);

  return <h1>{count}</h1>
}

/* istanbul ignore next */
const CounterWithLimit = () => {
  let [count, setCount] = useState(1);

  useIntervalWithLimit(() => {
    setCount(count + 1);
  }, 1000, 4000);

  return <h1>{count}</h1>
}

/* istanbul ignore next */
const App = () => {
  let [delay, setDelay] = useState<number|null>(1000);

  const toggle = () => {
    console.log('toggle');
    if (delay === 1000) setDelay(null);
    else setDelay(1000);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter delay={delay}/>
        <button onClick={toggle}>toggle</button>
        <CounterWithLimit />
      </header>
    </div>
  );
}

export default App;
