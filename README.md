# promise-all-settled

See the `test` directory (or run `npm install && npm test`) to see more complete examples.

### Usage Examples

Note: could easily rework if you wanted to always return just successes, etc.

```js
const allSettled = require('promise-all-settled')
const items = [1, 2, 3, 4, 5]
const getAsync = require('some-async-thing')
const promises = items.map((item) => getAsync(item))

allSettled(promises).then((results) => {
  // results is an array of objects with { state, (result|error) }
})

allSettled(promises, { onlyFulfilled: true }).then((results) => {
  // results is an array of the actual successful results
})

allSettled(promises, { onlyRejected: true }).then((errors) => {
  // errors is an array of the errors for failed results
})
```
