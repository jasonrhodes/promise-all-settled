const sinon = require('sinon')
require('sinon-as-promised')(Promise)
const expect = require('chai').expect

describe('promise-all-settled', function() {

  let promises
  let asyncResult
  let getAsyncSuccess
  let asyncError
  let getAsyncFail
  let allSettled

  beforeEach(function() {
    asyncResult = {}
    getAsyncSuccess = sinon.stub().resolves(asyncResult)
    asyncError = new Error()
    getAsyncFail = sinon.stub().rejects(asyncError)

    promises = [
      getAsyncSuccess(),
      getAsyncSuccess(),
      getAsyncFail(),
      getAsyncSuccess(),
      getAsyncFail()
    ]

    allSettled = require('../index')
  })

  it('should return state objects by default', function() {
    return allSettled(promises).then((results) => {
      expect(results).to.deep.equal([
        { state: 'fulfilled', result: asyncResult },
        { state: 'fulfilled', result: asyncResult },
        { state: 'rejected', error: asyncError },
        { state: 'fulfilled', result: asyncResult },
        { state: 'rejected', error: asyncError },
      ])
    })
  })

  it('should only return successes if specified', function() {
    return allSettled(promises, { onlyFulfilled: true }).then((results) => {
      expect(results).to.deep.equal([asyncResult, asyncResult, asyncResult])
    })
  })

  it('should only return errors if specified', function() {
    return allSettled(promises, { onlyRejected: true }).then((results) => {
      expect(results).to.deep.equal([asyncError, asyncError])
    })
  })

})
