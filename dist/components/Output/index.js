'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _serialize = require('../../serialize');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Output(props) {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      command = _useState2[0],
      setCommand = _useState2[1];

  var history = props.history || [];

  var scrollToBottom = function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  (0, _react.useEffect)(scrollToBottom, [history]);
  var messagesEndRef = (0, _react.useRef)(null);

  function sendCommand(event) {
    if (event.key === 'Enter') {
      try {
        // eslint-disable-next-line no-eval
        eval(command);
      } catch (error) {
        console.error(error);
      }
      setCommand('');
    }
  }

  return _react2.default.createElement(
    'div',
    { className: 'console ' + (props.theme || '') },
    _react2.default.createElement(
      'ul',
      { className: 'output' },
      history.map(function (line, i) {
        return _react2.default.createElement(
          'li',
          { key: i, className: 'line' },
          _react2.default.createElement(
            'div',
            { className: 'mode ' + line.mode },
            _react2.default.createElement(
              'div',
              { className: 'marker' },
              (0, _util.mark)(line.mode)
            )
          ),
          _react2.default.createElement('div', { className: 'content', dangerouslySetInnerHTML: { __html: (0, _serialize.serialize)(line.content) } })
        );
      })
    ),
    props.input && _react2.default.createElement(
      'div',
      { className: 'input' },
      _react2.default.createElement('input', {
        type: 'text', value: command,
        onKeyPress: function onKeyPress(event) {
          return sendCommand(event);
        },
        onChange: function onChange(event) {
          return setCommand(event.target.value);
        }
      })
    ),
    _react2.default.createElement('div', { ref: messagesEndRef })
  );
}

exports.default = Output;