'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Output = require('../Output');

var _Output2 = _interopRequireDefault(_Output);

var _WrapConsole = require('../WrapConsole');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Console(props) {
  return _react2.default.createElement(
    _WrapConsole.ConsoleProvider,
    { value: [] },
    _react2.default.createElement(
      _WrapConsole.ConsoleConsumer,
      null,
      function (value) {
        return _react2.default.createElement(_Output2.default, { history: value.history, input: props.input, theme: props.theme });
      }
    )
  );
}

Console.propTypes = {
  input: _propTypes2.default.bool,
  theme: _propTypes2.default.string
};

Console.defaultProps = {
  input: false,
  theme: ''
};

exports.default = Console;