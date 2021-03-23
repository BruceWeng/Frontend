// styles
import './styles/index.css'
import './styles/App.css'

// utils
import fetchToast from './utils/fetchToast'
import Eventer from './utils/Eventer'

// react
import React, {useState, useContext, useEffect, useReducer} from 'react'
import ReactDOM, { createPortal } from 'react-dom'

// ACTIONS
const ACTIONS = {
  TOAST_ADDED: 'toast-added',
  TOAST_REMOVED: 'toast-removed'
}

// Context
const ToastContext = React.createContext()

function ToastProvider({children}) { // Higher Order Component
  const reducer = (toasts, action) => {
    switch (action.type) {
      case ACTIONS.TOAST_ADDED: {
        for (let toast of toasts) {
          if (action.payload.toast.id === toast.id) return toasts
        }
        return [...toasts, action.payload.toast]
      }
      case ACTIONS.TOAST_REMOVED: {
        return toasts.filter(toast => toast.id !== action.payload.id)
      }
      default: return toasts
    }
  }
  const [toasts, dispatch] = useReducer(reducer, [])
  return (
    <ToastContext.Provider value={[toasts, dispatch]}>
      {children}
    </ToastContext.Provider>
  )
}

// Component
function ToastContainer() {
  const [toasts, dispatch] = useContext(ToastContext)
  const [DOMready, setDOMready] = useState(false)
  useEffect(() => {
    setDOMready(() => true)
    Eventer.on('toastFetched', (toast) => {
      // your code goes here
      console.log('toast fetched')
      dispatch({type: ACTIONS.TOAST_ADDED, payload: {toast}})
    })
  }, [])
  return DOMready
    ? createPortal(
        <div className="Toast__container">
          {toasts.map(toast => (
            <div className="Toast" key={toast.id} id={toast.id}>
              <div className="Toast__close-icon-container">
                <i className="Toast__close-icon" onClick={() => dispatch({type: ACTIONS.TOAST_REMOVED, payload: {id: toast.id}})}></i>
              </div>
              <div className="Toast__message">{toast.message || null}</div>
              <div className="Toast__action-container">
                <a className="Toast__action" href={toast.action ? toast.action.url : null}>{toast.action ? toast.action.label : null}</a>
              </div>
            </div> 
          ))}
        </div>
      , document.querySelector('#root'))
    : null
}

function App() {
  return (
    <ToastProvider>
      <div id="root"></div>
      <ToastContainer />
        <div className="App">
          <header className="App-header">
            <img src={process.env.PUBLIC_URL+'/static_images/logo.svg'} className="App-logo" alt="logo" />
          </header>
          <h1 className="App-title">Toast challenge</h1>
          <div className='App-intro'>
            <p>Welcome! If you haven't already, please check out the README.md file for complete instructions.</p>
            <p>Clicking the below button will fetch a toast message from our server and trigger an event on the provided Eventer.</p>
            <p>To get started, open <code>src/index.js</code> and add your code to the event handler for when a toast notificaiton has been fetched</p>
            <p>Changes to the <code>src/index.js</code> file, or any file imported into it, will cause a hot reload of the app.</p>
            <p>Feel free to use any library or framework your prefer. This app will transpile es6, as well.</p>
            <button id="fetch-toast-button" onClick={fetchToast}>Fetch Toast</button>
          </div>
        </div>
    </ToastProvider>
  )
}
ReactDOM.render(<App />, document.querySelector('#root'))