// INTENTED STATE WHEN WORKING
//
let game = Array.from({ length: 21 }, () => '')
let pins = [] // keeps track of each sub frame (will eventually be 21 or 22 frames)
let waits = [] // 2 for strike, 1 for spare, 0 otherwise
let allWaits = [] // same as waits but pushes 0 at the start of a frame as well (same length as pins)
let scores = [] // where totals for frames are kept (will always end up being length 10)
let scoresIndex // for indexing scores array
let frameTotal = 0 // for keeping track of score for all sub frames of a frame
let isFrameOver = false // becomes true when the subframe total === 10 or all subframes have been used

// DO I NEED THIS?
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
    // not strike or spare and all sub frames have values
    scores.push((scores[scores.length - 1] || 0) + x + frameTotal)
    waits.push(0)
    allWaits.push(0)
    isFrameOver = false
    scoresIndex = updateIndex()
    frameTotal = undefined
  } else if (!isFrameOver) {
    // first subframe of a frame without a strike
    frameTotal = x
    isFrameOver = true
    allWaits.push(0)
    return;
  }

  // the following updates the scores when there are:
  // 1) waits values > 0
  // 2) sufficient future frames too lookhead and get values from
  let i = -1
  let wasUpdated = false
  while (i < pins.length) {
    let lookAheadTotal = 0
    i++
    // while : there is either a strike or a spare
    while (allWaits[i] > 0) {
      // if : sufficient future frames to lookhead
      if (i + allWaits[i] < pins.length) {
        wasUpdated = true
        scores[scoresIndex] += pins[i + allWaits[i]]
        lookAheadTotal += pins[i + allWaits[i]]
        // waits[i]--
        waits[scoresIndex]--
        allWaits[i]--
      } else {
        break
      }
    }
    if (wasUpdated) {
      // how the subsequent scores are updated when a previous frame total in scores array is updated
      // e.g. scores[1] is a strike, so once two future frames are available scores[1] is updated and
      // then all subsequent scores are increased by the same about : r
      scoresIndex = updateIndex()
      for (let k = i, le = scores.length; k < le; k++) {
        scores[k] += lookAheadTotal
      }
    }
  }
  scores = scores.filter(score => !isNaN(score))
};
// updateFrame(1)
// console.log(scores, pins, waits, scoresIndex)
updateFrame(10) // strike
console.log(scores, pins, waits, scoresIndex)
updateFrame(10) // strike
// updateFrame(1)
// console.log(scores, pins, waits, scoresIndex)
// updateFrame(9)
console.log(scores, pins, waits, scoresIndex)
updateFrame(1)
console.log(scores, pins, waits, scoresIndex)
updateFrame(9) // spare
console.log(scores, pins, waits, scoresIndex)
updateFrame(1)
console.log(scores, pins, waits, scoresIndex)
updateFrame(7)
console.log(scores, pins, waits, scoresIndex)
console.log(`${[21, 41, 52, 60]}`, waits)