class Bowling {
  frames = [];
  rollItem = {
    rollOne: 0,
    rollTwo: 0,
    type: '',
    finished: false
  };
  
  roll(pins) {
    const lastRoll = this.frames[this.frame.length - 1]
    // if this.frames is empty
    if (!lastRoll) {
      // if it is a strike : create rollItem object and place in this.frames
      if (pins === 10) {
        this.rollItem.rollOne = 10
        this.rollItem.type = 'X'
        this.rollItem.finished = true
        this.frames.push({ ...this.rollItem })
        // if it is not a strike : start creation of this.rollItem object
      } else {
        this.rollItem.rollOne = pins
        this.rollItem.rollTwo = 0
      }
      // if this is the final frame
    } else if (this.frame[8]?.finished) {
      // if it is a strike : check if frame[9] exists
      // if not : create rollItem object with a third roll and place in this.frames
      if (!this.frame[9]) {
        if (pins === 10) {
          this.rollItem.rollOne = 10
          this.rollItem.rollTwo = 0
          this.rollItem.rollThree = 0
          this.rollItem.finished = false
          this.rollItem.type = 'X'
          this.frames.push({ ...this.rollItem })
        } else {
          this.rollItem.rollOne = pins
          this.rollItem.rollTwo = 0
          this.rollItem.rollThree = 0
          this.rollItem.type = ''
          this.rollItem.finished = false
          this.frame.push({ ...this.rollItem })
        }
      } else if (!this.frame[9]?.finished) {
        if (!)
      } else {
        

      }

      }
    }
  }
  score()
}