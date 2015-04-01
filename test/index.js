/**
 * Dependencies
 */

var test     = require('tape')
var MapStore = require('../')

/**
 * Tests
 */

test('MapStore()', function(t) {
  var store = new MapStore([
    ['foo', 'bar']
  ])

  t.test('.set(value)', function(assert) {
    store.on('set', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'baz')
      assert.equal(value, 'qux')
    })
    store.on('set:baz', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'qux')
    })
    store.set('baz', 'qux')
    assert.end()
  })

  t.test('.get([key])', function(assert) {
    assert.deepEqual(store.get(), [['foo', 'bar'], ['baz', 'qux']])
    assert.equal(store.get('foo'), 'bar')
    assert.end()
  })

  t.test('.del(key)', function(assert) {
    store.on('del', function(key, value) {
      assert.pass('should emit')
      assert.equal(key, 'foo')
      assert.equal(value, 'bar')
    })
    store.on('del:foo', function(value) {
      assert.pass('should emit')
      assert.equal(value, 'bar')
    })
    store.del('foo')
    assert.equal(store.get('foo'), undefined)
    assert.deepEqual(store.get(), [['baz', 'qux']])
    assert.end()
  })

  t.test('.close()', function(assert) {
    store.on('close', function(data) {
      assert.pass('should emit')
      assert.deepEqual(data, [['baz', 'qux']])
    })
    store.close()
    assert.deepEqual(store.get(), [])
    assert.end()
  })

  t.end()
})
