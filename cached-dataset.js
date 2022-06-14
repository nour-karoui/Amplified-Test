const DataSet = require('./dataset.js');

// cached data will be updated every 30 minutes
class CachedDataset {
    cachedData;
    dataset;
    constructor() {
        this.dataset = new DataSet();
        this.cachedData = null;
    }

    setCachedData(result) {
        this.cachedData = result
    }

    returnCachedResults (inputDate = Date.now(), nocache = false) {
        // if this is the first time retrieving the top3
        if (!data.lastCalled) {
            this.setCachedData(data.top3(inputDate))
            return this.cachedData
        }
        // if the time to the last call is more than 30 seconds or the user request the data to be not cached
        if (nocache || new Date(data.lastCalled + 30 * 60000) < inputDate) {
            this.setCachedData(data.top3(inputDate))
            return this.cachedData
        } else {
            return this.cachedData
        }
    }
}

module.exports = CachedDataset