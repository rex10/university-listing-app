"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToLocalStorage = exports.getFromLocalStorage = void 0;
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
exports.saveToLocalStorage = saveToLocalStorage;
const getFromLocalStorage = key => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
exports.getFromLocalStorage = getFromLocalStorage;