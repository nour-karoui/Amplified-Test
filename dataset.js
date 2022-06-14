class DataSet {
    constructor() {
        this.lastCalled = null;
        this.possibleValues = [['Mr', 'Ms'], ['Santa', 'Claus', 'Terminator', 'Caramba'], ['Santa', 'Claus', 'Terminator', 'Caramba'], ['My review says this is amazing', 'My review says this is ok', 'My review says this is MEH'], ['PST', 'EDT', 'UTC']];
    }


    gen(idx, changingValue) {
        return this.possibleValues[idx][changingValue % this.possibleValues[idx].length];
    }

    setLastCalled() {
        this.lastCalled = Date.now();
    }
    // give top 3 at current date or specified date
    top3(inputDate) {
        // extract a value out of the date (randomize)
        const changingValue = Math.floor(inputDate / 30000);
        this.setLastCalled();
        return {
            top3Reviews: [{
                name: `${this.gen(0, changingValue)} ${this.gen(1, changingValue)} ${this.gen(2, changingValue * 7)}`,
                body: `${this.gen(3, changingValue)}`,
                // get the date back
                date: changingValue * 30000,
                timezone: this.gen(4, changingValue)
            }, {
                name: `${this.gen(0, changingValue * 5)} ${this.gen(1, changingValue * 5)} ${this.gen(2, changingValue * 5 * 7)}`,
                body: `${this.gen(3, changingValue * 5)}`,
                date: changingValue * 30000 + 120000,
                timezone: this.gen(4, changingValue * 5)
            }, {
                name: `${this.gen(0, changingValue * 3)} ${this.gen(1, changingValue * 3)} ${this.gen(2, changingValue * 3 * 7)}`,
                body: `${this.gen(3, changingValue * 3)}`,
                date: changingValue * 30000 + 60000,
                timezone: this.gen(4, changingValue * 3)
            }]
        }
    }
}

module.exports = DataSet;