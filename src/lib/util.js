
/**
 * @todo customize: icon etc
 */
export const mark = function (mode) {
  switch (mode) {
    case 'info':
    case 'warn':
    case 'debug':
    case 'error':
      return mode
    case 'log':
    default:
      return 'log'
  }
}

export const reference = function () {
  return 'at index.js:32'
  // return new Error().stack + source map ...
}
