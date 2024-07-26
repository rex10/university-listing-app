"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
class ErrorBoundary extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    console.error('Error caught in ErrorBoundary:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/_react.default.createElement("h1", null, "Something went wrong.");
    }
    return this.props.children;
  }
}
var _default = exports.default = ErrorBoundary;