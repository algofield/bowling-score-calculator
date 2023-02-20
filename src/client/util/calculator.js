let game = Array.from({ length: 21 }, () => '')
let pins = []
let waits = []
let allWaits = []
let scores = []
let scoresIndex
let frameTotal = 0
let isFrameOver = false

let updateIndex = function() {
  let waits2 = waits.indexOf(2)
  let waits1 = waits.indexOf(1)
  waits2 = waits2 > -1 ? waits2 : Infinity
  waits1 = waits1 > -1 ? waits1 : Infinity
  return Math.min(waits.length, waits2, waits1)
}

let updateFrame = function(x) {
  pins.push(x)
  if (x === 10) {
    // strike
    scores.push((scores[scores.length - 1] || 0) + 10)
    waits.push(2)
    allWaits.push(2)
    frameTotal = undefined
    isFrameOver = false
  } else if (frameTotal + x === 10) {
    // spare
    console.log('SPARE')
    scores.push((scores[scores.length - 1] || 0) + x + frameTotal)
    waits.push(1)
    allWaits.push(1)
    frameTotal = undefined
    isFrameOver = false
  } else if (isFrameOver) {
    scores.push((scores[scores.length - 1] || 0) + x + frameTotal)
    waits.push(0)
    allWaits.push(0)
    isFrameOver = false
    scoresIndex = updateIndex()
    frameTotal = undefined
  } else if (!isFrameOver) {
    frameTotal = x
    isFrameOver = true
    allWaits.push(0)
    return;
  }

  let i = -1
  let wasUpdated = false
  while (i < pins.length) {
    let r = 0
    i++
    while (allWaits[i] > 0) {
      if (i + allWaits[i] < pins.length) {
        wasUpdated = true
        scores[scoresIndex] += pins[i + allWaits[i]]
        // console.log('HERE', scoresIndex, scores)
        r += pins[i + allWaits[i]]
        // waits[i]--
        waits[scoresIndex]--
        allWaits[i]--
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
  scores = scores.filter(score => !isNaN(score))
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
updateFrame(1)
console.log(scores, pins, waits, scoresIndex)
updateFrame(9)
console.log(scores, pins, waits, scoresIndex)
updateFrame(1)
console.log(scores, pins, waits, scoresIndex)
updateFrame(7)
console.log(scores, pins, waits, scoresIndex)
console.log(`${[21, 41, 52, 60]}`, waits)