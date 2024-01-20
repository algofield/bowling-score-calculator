'use strict';

import Frame from './Frame';
import TenthFrame from './TenthFrame';

function ScoreCard() {
  this.frames = [];
}

ScoreCard.prototype.create = function(element) {
  if (this.frameCount() < 10) {
    for (var i = 0; i < 9; i++) {
      this.frames.push(new Frame());
    }
      this.frames.push(new TenthFrame());
  }
};

ScoreCard.prototype.frameCount = function() { 
  return this.frames.length;
};

ScoreCard.prototype.score = function () {
  var total = 0;
  for (var i = 0; i < this.frames.length; i++) {
    total += this.frames[i].score;
  }
  return total;
};

ScoreCard.prototype.evaluateScores = function() {
  for (var i = 0; i < 9; i++) { 
    this._evaluateSpare(i);
    this._evaluateStrike(i);  
  }
};

ScoreCard.prototype._evaluateSpare = function(i) {
   if (this.frames[i].isSpare()) {
    this.frames[i].score += this._firstExtraRoll(i);
   }
};

ScoreCard.prototype._evaluateStrike = function(i) {
   if (this.frames[i].isStrike()) {
    this.frames[i].score += (this._firstExtraRoll(i) + this._secondExtraRoll(i));
   }
};

ScoreCard.prototype._firstExtraRoll = function(i) {
  return this.frames[i+1].firstShot;
};

ScoreCard.prototype._secondExtraRoll = function(i) {
  return this.frames[i+1].secondShot || this.frames[i+2].firstShot;
};

export default ScoreCard;