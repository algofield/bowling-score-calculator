let game = Array.from({ length: 21 }, () => '')
let pins = []
let waits = []
let scores = []
let scoresIndex = -1
let frameTotal = 0
let isFrameOver = false

let updateIndex = function() {
  let waits2 = waits.indexOf(2)
  let waits1 = waits.indexOf(1)
  waits2 = waits2 > -1 ? waits : Infinity
  waits1 = waits1 > -1 ? waits : Infinity
  return Math.min(waits.length, waits2, waits1)
}

let updateFrame = function(x) {
  pins.push(x)
  if (x === 10) {
    // strike
    scores.push((scores[scores.length - 1] || 0) + 10)
    waits.push(2)
    frameTotal = undefined
    isFrameOver = false
  } else if (frameTotal + x === 10) {
    // spare
    scores.push((scores[scores.length - 1] || 0) + x + frameTotal)
    waits.push(1)
    frameTotal = undefined
    isFrameOver = false
  } else if (isFrameOver) {
    scores.push((scores[scores.length - 1] || 0) + x + frameTotal)
    waits.push(0)
    isFrameOver = false
    scoresIndex = updateIndex()
    frameTotal = undefined
  } else if (!isFrameOver) {
    frameTotal = x
    isFrameOver = true
    waits.push(0)
    return;
  }

  let i = -1
  let wasUpdated = false
  while (i < waits.length) {
    let r = 0
    i++
    while (waits[i] > 0) {
      if (i + waits[i] < pins.length) {
        wasUpdated = true
        scores[scoresIndex] += pins[i + waits[i]]
        r += pins[i + waits[i]]
        waits[i]--
      } else {
        break
      }
    }
    if (wasUpdated) {
      scoresIndex = updateIndex()
      for (let k = i, le = scores.length; k < le; k++) {
        scores[k] += r
      }
    }
  }
  let j = 0
  for (let len = scores.length; j < len; j++) {
    if (isNaN(scores[j])) {
      break;
    }
  }
  scores = scores.slice(0, j)
};
// updateFrame(1)
// console.log(scores, pins, waits, scoresIndex)
updateFrame(10)
console.log(scores, pins, waits, scoresIndex)
updateFrame(10)
// updateFrame(1)
// console.log(scores, pins, waits, scoresIndex)
// updateFrame(9)
console.log(scores, pins, waits, scoresIndex)
updateFrame(10)
console.log(scores, pins, waits, scoresIndex)
updateFrame(10)
console.log(scores, pins, waits, scoresIndex)
updateFrame(1)
console.log(scores, pins, waits, scoresIndex)
updateFrame(7)
console.log(scores, pins, waits, scoresIndex)
console.log(`${[8,28,46,54]}`)