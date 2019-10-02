'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleConsumer = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ConsoleProvider = ConsoleProvider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _console = {};
/**
  * wrap console methods to get contents and display on component output
  * @todo features: clear, download
  * @todo format: table, dir?, trace
  * @todo other: time, group, assert, context, count, memory, profile ...?
  */
function wrap() {
  if (_console.wrap) {
    return;
  }

  var _loop = function _loop(_method) {
    _console[_method] = console[_method];
    // eslint-disable-next-line no-loop-func
    console[_method] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _context({ mode: _method, content: args, reference: (0, _util.reference)() });
      _console[_method].apply(_console, args);
    };
  };

  var _arr = ['log', 'info', 'error', 'warn', 'debug'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var _method = _arr[_i];
    _loop(_method);
  }
  _console.wrap = true;
}

var ConsoleContext = (0, _react.createContext)();

var _context = void 0;
function ConsoleProvider(props) {
  var _useState = (0, _react.useState)(props.value || []),
      _useState2 = _slicedToArray(_useState, 2),
      history = _useState2[0],
      setConsole = _useState2[1];

  _context = function _context() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    setConsole([].concat(_toConsumableArray(history), args));
  };
  wrap();

  return _react2.default.createElement(
    ConsoleContext.Provider,
    { value: { history: history } },
    props.children
  );
}

var ConsoleConsumer = exports.ConsoleConsumer = ConsoleContext.Consumer;