import React from 'react';

const Square = ({ value, isDisabled, onClick }) => {
  const style = isDisabled ? `num disabled` : `num`
  return (
    <div className={style} onClick={onClick} disabled={isDisabled}>
      {value}
    </div>
  )

}

export default Square;