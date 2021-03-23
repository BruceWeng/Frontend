Instacart Toast Challenge
=========================

This challenge will require you to follow a design and a set of requirements to create a "toast" notification that appears from the bottom of the screen. The content of the notification comes from an API that we provide. An application is provided to start.

You can use any library or framework you prefer.

## The designs
Designs can be found inline in the CodeSignal challenge description screen.

## To start the application
```js
npm install
npm start
```

The application should open a browser window to the app. If no window opens, you can open a window to http://localhost:3000 manually.


## Styling
This application gives you hot-reloading and es6 transpilation out of the box. It uses css files for simple styling, but feel free to use any other kind of styling language you prefer (scss, less, js styles, etc). The css will hot reload as changes are saved.

## Toast types
- **Toast with an action** -- As per the design, the link is on the right of the message.
- **Toast with no action** -- Actions are not required, so it's possible a toast notification does not have an action.

## JSON contract
_**All fields in the payload are optional**_


#### Payload example
```js
{
  message: "This is the content of a message. It can be very short or very long. Keep that in mind.",
  action: {
    label: "Action label",
    url: "http://www.instacart.com"
  }
}
```
`message` and `action` are both optionally included in a payload.

## How to write your code
Clicking the "Fetch Toast" button will cause a call to fetch a toast message from our server, which will trigger an event on the provided Eventer once the call has completed.

In `src/index.js`, look for the function
```js
Eventer.on('toastFetched', (toast) => {
  // your code goes here
}
```

This is where you will receive new toast messages. Using any framework, library or tools you'd like, add code to this application so that a new toast notification will apear on every successful call to fetch.

You can change any file in the application you'd like.

## Things to keep in mind
- Don't worry too much about cross-browser support for this challenge. We'll be using the latest Chrome build to view/test
- Please don't simply import a message or toast library that does the work for you. This challenge meant to show your abilities
- Other than the above, you can use any library or framework you prefer. `npm install` or `yarn install` are free to use
- The API will return a randomized set of notifications. Try your code on several examples and be sure to keep all the permutations in mind
- There is a design for smaller screens included. Be sure to design for this
- Not sure about a use case? Use your best judgement for what should happen based on the designs
- Show us your product sense and polishing abilities. If you find time, focus on smaller nuances like animation or accessibility

## Lesson learnt
# React
1. Use ToastProvider to handle add and remove toast.
2. Create ToastContext for ToastProvider using React.createContext and not to pass anything in.
3. Remember to pass children object in ToastProvider and Wrap {children} in ToastContext.Provider.
4. Use useReducer for TOAST_ADDED and TOAST_REMOVED in ToastProvider.
5. Pass [toasts, dispatch] in ToastContext.Provider value.
6. Create ToastContainer as component to return toast portal list.
7. Use React.createPortal to map toast list to the screen. First arguement is DOM to attach, second arguement is target DOM attached on.
8. Declare a boolean state DOMready false by default. And setDOMready to true in useEffect. Make sure createPortal only after target DOM is mounted to the document.
9. Put Eventer.on callback in useEffect and put dispatch ACTION.TOAST_ADDED in Eventer.on callback.
10. Make sure action payload has an Object type property.
11. Use process.env.PUBLIC_URL to acceess relative path.
12. Check toast.message and toast.action exist first before reandering. Set default value to null.
# CSS
1. Toast__container only address starting position of the toast list.
2. Toast address toast markup. 
3. To align element to right and cursor only change on the element, Create a container and put flex-end in the container rather than the element itself.
4. Use sudo element ::before content for icon, and use font-size in original class to control the size.
