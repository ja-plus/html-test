import React from 'react';
import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div class="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} class="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React</h1>
      <div class="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/react/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">Click on the Rspack and React logos to learn more</p>
    </div>
  );
}

export default App;
