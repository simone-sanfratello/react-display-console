/**
 * from @see json-stringify-extend arranged
 * @param {*} data
 * @param {function(key:String, value:*)} options.replace replace by key or value
 */

export const serialize = function (data, replace) {
  const __done = {
    values: [],
    paths: []
  }
  const __counter = {
    object: 0,
    array: 0
  }
  const options = {
    endline: '',
    replace
  }

  const __circularity = function (val, path) {
    const i = __done.values.indexOf(val)
    if (i !== -1 && path.indexOf(__done.paths[i]) === 0) {
      // do not throw new Error('Circular reference @ ' + path)
      return true
    }
    __done.values.push(val)
    __done.paths.push(path)
    return false
  }

  const __serialize = {
    function: function (obj) {
      return '<div class="type function">[Function]</div>'
    },
    number: function (obj) {
      return `<div class="type number">${obj}</div>`
    },
    string: function (obj, deep) {
      if (obj.indexOf('\n') !== -1) {
        obj = obj.split('\n').join('\\n')
      }
      if (obj.indexOf('\t') !== -1) {
        obj = obj.split('\t').join('\\t')
      }
      const _value = deep > 2 ? `"${obj}"` : obj
      return `<div class="type string">${_value}</div>`
    },
    boolean: function (obj, deep) {
      return `<div class="type boolean">${obj ? 'true' : 'false'}</div>`
    },
    null: function () {
      return '<div class="type null">null</div>'
    },
    undefined: function () {
      return '<div class="type undefined">undefined</div>'
    },
    date: function (obj) {
      return `<div class="type date">Date#${obj.toISOString()}</div>`
    },
    symbol: function (obj) {
      return `<div class="type symbol">${obj.toString()}</div>`
    },
    regexp: function (obj) {
      return `<div class='type regexp'>RegExp#${obj.toString()}</div>`
    },
    error: function (obj) {
      const stack = obj.stack.split('\n').splice(1).map(line => '\n  ' + line.trim()).join('')
      return `<div class='type error'><div class='name'>Error</div><div class='message'>message: ${obj.message}</div><div class='stack'>stack: ${stack}</div></div>`
    },
    object: function (obj, deep, path) {
      __counter.object++
      if (!path) {
        path = '{}'
      }

      if (__circularity(obj, path)) {
        return `<div class='type object'>${options.endline + '#Object-Circularity#' + options.endline}</div>`
      }

      const _out = []
      for (const key in obj) {
        const _path = path + '.' + key
        const _item = __item(key, obj[key], deep + 1, _path)
        _out.push(`<div class='item'><div class='key'>${_item.key}:</div><div class='value'>${_item.value}</div></div>`)
      }
      return `<div class='type object'>{${_out.join(' ')}}</div>`
    },
    array: function (array, deep, path) {
      __counter.array++
      if (!path) {
        path = '[]'
      }

      if (__circularity(array, path)) {
        return '<div class="type array">#Array-Circularity#</div>'
      }

      const _out = []
      for (let i = 0; i < array.length; i++) {
        const _path = path + '.' + i
        const _item = __item(null, array[i], deep + 1, _path)
        if (_item) {
          _out.push(options.endline + _item.value)
        }
      }
      if (deep > 1) {
        return `<div class='type array'>[${_out.map(i => `<div class='item'>${i}</div>`).join(', ') + options.endline}]</div>`
      } else {
        return _out.join(' ') + options.endline
      }
    }
  }

  const __item = function (key, value, deep, path) {
    if (!deep) deep = 1

    /*
    @todo?
    if (options.replace) {
      ({ key, value } = options.replace(key, value))
    }
    */

    let _type = typeof value
    if (_type === 'object') {
      if (value instanceof Array) {
        _type = 'array'
      } else if (value instanceof Error) {
        _type = 'error'
      } else if (value instanceof Date) {
        _type = 'date'
      } else if (value instanceof RegExp) {
        _type = 'regexp'
      } else if (value === null) {
        _type = 'null'
      }
    }

    if (!__serialize[_type]) {
      _type = 'string'
    }

    return { key, value: __serialize[_type](value, deep, path) }
  }

  const _item = __item(null, data)
  return _item ? _item.value : {}
}
