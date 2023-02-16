import React from 'react';
import '../styles/style.css';

const NumberPad = function NumberPad({ range }) {

  return (
    <div className="np-container">
      {
        range.map((n, i) => (
          <div className="num" key={i}>
            {n}
          </div>
        ))
      }
    </div>
  )
}

export default NumberPad