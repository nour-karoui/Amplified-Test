const DataSet = require('../dataset');
const CachedDataSet = require('../cached-dataset');
jest.mock('../dataset');

test('it initializes dataset', () => {
    new CachedDataSet();
    expect(DataSet).toHaveBeenCalled();
});

test('it calls the dataset fetch top in the first time', () => {
    const cachedData = new CachedDataSet();
    const data = cachedData.dataset;
    let spy = jest.spyOn(data, 'top3').mockImplementation(() => 'Hello');
    expect(data.top3).toHaveBeenCalled();

});

test('it uses cache when called second time', () => {
    new CachedDataSet();
    expect(DataSet).toHaveBeenCalled();
});