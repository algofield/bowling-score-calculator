'use strict';

import Frame from './Frame';

function TenthFrame() {
  this.thirdShot = null;
  this.isFrame10 = true;
}

TenthFrame.prototype = new Frame();

TenthFrame.prototype.receiveShot = function(hitpins) {
  this._checkShotLegality(hitpins);
  this._updateFrameVariables(hitpins);
  this.shotCount++;
};

TenthFrame.prototype._checkShotLegality = function(hitpins) {
  if ( this._isSpareOrStrikeWith3Shots() || this._isNotASpareOrStrikeWith2Shots() )  { 
    throw new Error ("You can not receive another shot in this frame."); 
  }
};

TenthFrame.prototype._updateFrameVariables = function(hitpins) {
  this._resetPins(hitpins);
  this.score += hitpins;
  this._assignShot(hitpins);
};

TenthFrame.prototype._resetPins = function(hitpins) {
  if (hitpins === 10 ) {
    this.pinCount = 10; 
  } else if ( (this.firstShot + this.secondShot) === 10 ) {
    this.pinCount = 10;
  } else {
    this.pinCount -= hitpins;
  }
};

TenthFrame.prototype._isSpareOrStrikeWith3Shots = function() {
  return ((this.isSpare() || this.isStrike()) && this.shotCount === 3);
};

TenthFrame.prototype._isNotASpareOrStrikeWith2Shots = function() {
  return ((!this.isStrike() && !this.isSpare()) && this.shotCount === 2);
};

TenthFrame.prototype._assignShot = function(hitpins) {
    this.firstShot === null ? this.firstShot = hitpins : 
  this.secondShot === null ? this.secondShot = hitpins : this.thirdShot = hitpins;
};

export default TenthFrame;