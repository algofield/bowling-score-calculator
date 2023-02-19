import React from 'react';
import '../styles/style.css';
import Square from './Square';

const NumberPad = function NumberPad({ range, disabledList, onClick }) {
  return (
    <div className="np-container">
      {
        range.map((n, i) => (
          <Square key={i} value={n} isDisabled={disabledList[i]} onClick={() => onClick(i)}></Square>
        ))
      }
    </div>
  )
}

export default NumberPad