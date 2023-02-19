import React, { useState } from 'react';
import '../styles/style.css';
import Bowling from '../util/bowling';
import NumberPad from './NumberPad';
import ScoreBoard from './ScoreBoard';

const App = function App() {
  const buildRange10 = () => Array.from({ length: 11 }, (_, i) => i)
  const range = buildRange10()
  let bowl = new Bowling();
  let [frames, updateFrames] = useState(Array
    .from({ length: 9}, () => ({ score: 0, subFrames: ['-', '-'] }))
    .concat([{ score:0, subFrames: ['-', '-', '-'] }]))
  let [disabledList, setDisabledList] = useState(Array.from({ length: 10 }, () => false))
  let [isSecondClick, setIsSecondClick] = useState(false)

  const clickHandler = (index) => {
    let dlist = disabledList.slice()
    let bound = 10 - index;
    // If the number clicked is 10 : disable nothing
    if (index === 10) {
      setIsSecondClick(false)
    } else {  // if the number clicked is not 10
      if (isSecondClick) { // check if second click's number matches a disabled square; if so return
        for (let i = 0, len = dlist.length; i < len; i++) {
          if (dlist[i] === true && i === index) {
            return;
          }
        }
        dlist = dlist.map(x => false)
      } else {
        for (let i = bound + 1; i <= 10; i++) {
          dlist[i] = true
        }
      }
      setIsSecondClick(!isSecondClick)
      setDisabledList(dlist)
    }
    bowl.roll(index)
    let score = bowl.score()
    console.log(score)
  }

  return(
    <div className='page-container'>
      <h1 className='title'>Bowling Score Calculator</h1>
      <ScoreBoard frames={frames}/>
      <NumberPad range={range} onClick={clickHandler} disabledList={disabledList}/>
    </div>
  )
}

export default App