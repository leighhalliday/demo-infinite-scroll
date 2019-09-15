import React from "react";
import "./App.css";

import WithReducer from "./WithReducer";
import WithContext from "./WithContext";
import WithIntersection from "./WithIntersection";
import StateMachineIntro from "./StateMachineIntro";
import WithStateMachine from "./WithStateMachine";

function App() {
  return (
    <div className="App">
      <h1>Data Loading Examples</h1>
      <p>
        These examples cover the use of useReducer, useContext,
        IntersectionObserver, and managing the loading state using XState.
      </p>

      <h2>useReducer</h2>
      <WithReducer />

      <h2>useContext</h2>
      <WithContext />

      <h2>IntersectionObserver</h2>
      <WithIntersection />

      <h2>XState Intro</h2>
      <StateMachineIntro />

      <h2>XState Data Loading Service</h2>
      <WithStateMachine />
    </div>
  );
}

export default App;
