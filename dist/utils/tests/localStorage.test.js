"use strict";

var _localStorage = require("../localStorage");
// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});
describe('Local Storage Utility Functions', () => {
  test('saveToLocalStorage should save data to localStorage', () => {
    const key = 'testKey';
    const data = {
      foo: 'bar'
    };
    (0, _localStorage.saveToLocalStorage)(key, data);

    // Verify that localStorage has the correct data
    const storedData = localStorage.getItem(key);
    expect(storedData).not.toBeNull();
    expect(JSON.parse(storedData)).toEqual(data);
  });
  test('getFromLocalStorage should retrieve data from localStorage', () => {
    const key = 'testKey';
    const data = {
      foo: 'bar'
    };

    // Set the item in localStorage directly
    localStorage.setItem(key, JSON.stringify(data));

    // Use getFromLocalStorage to retrieve it
    const retrievedData = (0, _localStorage.getFromLocalStorage)(key);
    expect(retrievedData).toEqual(data);
  });
  test('getFromLocalStorage should return null if the key does not exist', () => {
    const key = 'nonExistentKey';
    const retrievedData = (0, _localStorage.getFromLocalStorage)(key);
    expect(retrievedData).toBeNull();
  });
});