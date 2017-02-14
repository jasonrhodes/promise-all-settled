const captureSuccess = (result) => ({ state: 'fulfilled', result })
const captureFail = (error) => ({ state: 'rejected', error })

module.exports = (promises, { onlyFulfilled = false, onlyRejected = false } = {}) => {
  const settled = Promise.all(promises.map((p) => p.then(captureSuccess).catch(captureFail)))

  if (onlyFulfilled) {
    return settled.then((results) => results.filter((r) => r.state === 'fulfilled').map((r) => r.result))
  }

  if (onlyRejected) {
    return settled.then((results) => results.filter((r) => r.state === 'rejected').map((r) => r.error))
  }

  return settled
}
