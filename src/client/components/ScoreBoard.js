import React from 'react';
import '../styles/style.css';

const ScoreBoard = function ScoreBoard({ frames }) {

  return (
    <div className='sb-container'>
      {
        frames.map((data, i) => (
          <div
            key={i}
            className='frame'
          >
            <div className="sub-frame-container">
              {
                data.subFrames.map((value, k) => (
                  <div className="sub-frame" key={k}>
                    {value}
                  </div>
                ))
              }
            </div>
            <div className='frame-score'>{data.score}</div>
          </div>
        ))
      }
    </div>
  )
}

export default ScoreBoard