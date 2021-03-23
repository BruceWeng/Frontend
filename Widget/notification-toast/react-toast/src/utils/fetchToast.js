import 'whatwg-fetch'
import Eventer from './Eventer'

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
const parseJson = response => response.json()
const logResp = (response) => {
  console.log(`${Date.now()} - Toast payload: `, response)
  return response
}
const triggerToast = resp => Eventer.trigger('toastFetched', resp)

const fetchToast = () => {
  const random = Math.floor(Math.random() * 3) + 1
  fetch(`http://localhost:5000/messages/${random}`)
    .then(checkStatus)
    .then(parseJson)
    .then(logResp)
    .then(triggerToast)
    .catch(error => {
      console.error(`Request for Toast data failed: ${error}`)
    })
}

export default fetchToast
