import React, { useState } from 'react';
import '../styles/style.css';
import NumberPad from './NumberPad';
import ScoreBoard from './ScoreBoard';

const App = function App() {

  let [counter, updateCounter] = useState(0)

  let [frames, updateFrames] = useState(Array.from({ length: 9}, () => ({ score: 0, subFrames: ['-', '-']})).concat([{score:0, subFrames: ['-', '-', '-']}]))

  let range = Array.from({ length: 10 }, (_, i) => i)

  return(
    <div className='page-container'>
      <h1 className='title'>Bowling Score Calculator</h1>
      <ScoreBoard frames={frames}/>
      <NumberPad range={range}/>
    </div>
  )
}

export default App