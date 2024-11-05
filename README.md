# Using `fetch` in React to Communicate with an Express Service

This repository demonstrates two ways to use `fetch` in Javascript to communicate asynchronously. It can be a little jarring to work with asynchronous code at first. Take your time and experiment frequently. This React project was created using `npm create-react-app`. The examples described here can be found in the `App.js` module. 

Note that in this `create-react-app` project, App.js is intended to be used as the top-level component. App.js exports the App component. The App component is rendered into the React DOM in index.js.

## Overview

This react application first presents a text entry input field and button. Enter a student id in the input field and click on the button to (hopefully) render the last and first name of the corresponding student.

## Using `fetch` to request the student's name

Given a student's v-number, `vnum`, construct a request and submit that request using `fetch`. At first glance, this is a simple matter, just 
```js 
const data = fetch("http://localhost:3000/users?vnum=120");
``` 
right? No. The `fetch` function does not return response that we can directly assign to the const `data`. Instead, it returns a `Promise`. 