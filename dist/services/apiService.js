"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
const API_URL = 'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates';
const getUniversities = async function () {
  let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  try {
    const response = await _axios.default.get(API_URL, {
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};
const apiService = {
  getUniversities
};
var _default = exports.default = apiService;