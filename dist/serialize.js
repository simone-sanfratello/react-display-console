'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * from @see json-stringify-extend arranged
 * @param {*} data
 * @param {function(key:String, value:*)} options.replace replace by key or value
 */

var serialize = exports.serialize = function serialize(data, replace) {
  var __done = {
    values: [],
    paths: []
  };
  var __counter = {
    object: 0,
    array: 0
  };
  var options = {
    endline: '',
    replace: replace
  };

  var __circularity = function __circularity(val, path) {
    var i = __done.values.indexOf(val);
    if (i !== -1 && path.indexOf(__done.paths[i]) === 0) {
      // do not throw new Error('Circular reference @ ' + path)
      return true;
    }
    __done.values.push(val);
    __done.paths.push(path);
    return false;
  };

  var __serialize = {
    function: function _function(obj) {
      return '<div class="type function">[Function]</div>';
    },
    number: function number(obj) {
      return '<div class="type number">' + obj + '</div>';
    },
    string: function string(obj, deep) {
      if (obj.indexOf('\n') !== -1) {
        obj = obj.split('\n').join('\\n');
      }
      if (obj.indexOf('\t') !== -1) {
        obj = obj.split('\t').join('\\t');
      }
      var _value = deep > 2 ? '"' + obj + '"' : obj;
      return '<div class="type string">' + _value + '</div>';
    },
    boolean: function boolean(obj, deep) {
      return '<div class="type boolean">' + (obj ? 'true' : 'false') + '</div>';
    },
    null: function _null() {
      return '<div class="type null">null</div>';
    },
    undefined: function undefined() {
      return '<div class="type undefined">undefined</div>';
    },
    date: function date(obj) {
      return '<div class="type date">Date#' + obj.toISOString() + '</div>';
    },
    symbol: function symbol(obj) {
      return '<div class="type symbol">' + obj.toString() + '</div>';
    },
    regexp: function regexp(obj) {
      return '<div class=\'type regexp\'>RegExp#' + obj.toString() + '</div>';
    },
    error: function error(obj) {
      var stack = obj.stack.split('\n').splice(1).map(function (line) {
        return '\n  ' + line.trim();
      }).join('');
      return '<div class=\'type error\'><div class=\'name\'>Error</div><div class=\'message\'>message: ' + obj.message + '</div><div class=\'stack\'>stack: ' + stack + '</div></div>';
    },
    object: function object(obj, deep, path) {
      __counter.object++;
      if (!path) {
        path = '{}';
      }

      if (__circularity(obj, path)) {
        return '<div class=\'type object\'>' + (options.endline + '#Object-Circularity#' + options.endline) + '</div>';
      }

      var _out = [];
      for (var key in obj) {
        var _path = path + '.' + key;
        var _item2 = __item(key, obj[key], deep + 1, _path);
        _out.push('<div class=\'item\'><div class=\'key\'>' + _item2.key + ':</div><div class=\'value\'>' + _item2.value + '</div></div>');
      }
      return '<div class=\'type object\'>{' + _out.join(' ') + '}</div>';
    },
    array: function array(_array, deep, path) {
      __counter.array++;
      if (!path) {
        path = '[]';
      }

      if (__circularity(_array, path)) {
        return '<div class="type array">#Array-Circularity#</div>';
      }

      var _out = [];
      for (var i = 0; i < _array.length; i++) {
        var _path = path + '.' + i;
        var _item3 = __item(null, _array[i], deep + 1, _path);
        if (_item3) {
          _out.push(options.endline + _item3.value);
        }
      }
      if (deep > 1) {
        return '<div class=\'type array\'>[' + (_out.map(function (i) {
          return '<div class=\'item\'>' + i + '</div>';
        }).join(', ') + options.endline) + ']</div>';
      } else {
        return _out.join(' ') + options.endline;
      }
    }
  };

  var __item = function __item(key, value, deep, path) {
    if (!deep) deep = 1;

    /*
    @todo?
    if (options.replace) {
      ({ key, value } = options.replace(key, value))
    }
    */

    var _type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (_type === 'object') {
      if (value instanceof Array) {
        _type = 'array';
      } else if (value instanceof Error) {
        _type = 'error';
      } else if (value instanceof Date) {
        _type = 'date';
      } else if (value instanceof RegExp) {
        _type = 'regexp';
      } else if (value === null) {
        _type = 'null';
      }
    }

    if (!__serialize[_type]) {
      _type = 'string';
    }

    return { key: key, value: __serialize[_type](value, deep, path) };
  };

  var _item = __item(null, data);
  return _item ? _item.value : {};
};