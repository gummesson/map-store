# map-store

[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Build status][travis-img]][travis-url]

An observable `Map`-like datastore.

## Installation

```
npm install map-store
```

## Usage

``` javascript
var MapStore = require('map-store')

var store = new MapStore([
  ['foo', 'bar']
])

store.on('set', function(key, value) {
  console.log(key)   // => "baz"
  console.log(value) // => "qux"
})

store.on('set:baz', function(value) {
  console.log(value) // => "qux"
})

store.set('baz', 'qux')

store.get('foo') // => "bar"
store.get()      // => [['foo', 'bar'], ['baz', 'qux']]

store.on('del', function(key, value) {
  console.log(key)   // => "foo"
  console.log(value) // => "baz"
})

store.on('del:foo', function(value) {
  console.log(value) // => "bar"
})

store.del('foo')

store.on('close', function(data) {
  console.log(data) // => [['baz', 'qux']]
})

store.close()
```

## See also

- [ez-map](https://github.com/gummesson/ez-map)
- [arrays-to-object](https://github.com/gummesson/arrays-to-object)
- [object-to-arrays](https://github.com/gummesson/object-to-arrays)

[npm-img]: https://img.shields.io/npm/v/map-store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/map-store
[license-img]: http://img.shields.io/npm/l/map-store.svg?style=flat-square
[license-url]: LICENSE
[travis-img]: https://img.shields.io/travis/gummesson/map-store.svg?style=flat-square
[travis-url]: https://travis-ci.org/gummesson/map-store
