/**
 * Dependencies
 */

var Evmit    = require('evmit')
var inherits = require('minherits')
var EzMap    = require('ez-map')

/**
 * Initialize `MapStore`.
 *
 * @constructor
 * @param {array} [data]
 *
 * @api public
 */

function MapStore(data) {
  this.data = new EzMap(data)
  Evmit.call(this)
}

inherits(MapStore, Evmit)

/**
 * Set an entry.
 *
 * @param  {mixed} key
 * @param  {mixed} [value]
 * @return {this}
 *
 * @api public
 */

MapStore.prototype.set = function(key, value) {
  this.data.set(key, value)
  this.emit('set', key, value)
  this.emit('set:' + key, value)
  return this
}

/**
 * Get an entry or all entries.
 *
 * @param  {mixed} [key]
 * @return {mixed}
 *
 * @api public
 */

MapStore.prototype.get = function(key) {
  if (key) return this.data.get(key)
  return this.data.entries()
}

/**
 * Delete an entry.
 *
 * @param  {mixed} key
 * @return {this}
 *
 * @api public
 */

MapStore.prototype.del = function(key) {
  var value = this.data.get(key)
  this.data.delete(key)
  this.emit('del', key, value)
  this.emit('del:' + key, value)
  return this
}

/**
 * Close the store.
 *
 * @return {void}
 *
 * @api public
 */

MapStore.prototype.close = function() {
  var data = this.data.entries()
  this.data.clear()
  this.emit('close', data)
}

/**
 * Exports
 */

module.exports = MapStore
