'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @todo customize: icon etc
 */
var mark = exports.mark = function mark(mode) {
  switch (mode) {
    case 'info':
    case 'warn':
    case 'debug':
    case 'error':
      return mode;
    case 'log':
    default:
      return 'log';
  }
};

var reference = exports.reference = function reference() {
  return 'at index.js:32';
  // return new Error().stack + source map ...
};