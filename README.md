# Using `fetch` in React to Communicate with an Express Service

This repository demonstrates two ways to use `fetch` in Javascript to communicate asynchronously. It can be a little jarring to work with asynchronous code at first. Take your time and experiment frequently. This React project was created using `npm create-react-app`. The examples described here can be found in the `App.js` module. 

Note that in this `create-react-app` project, App.js is intended to be used as the top-level component. App.js exports the App component. The App component is rendered into the React DOM in index.js.

## Overview

This react application first presents a text entry input field and button. Enter a student id in the input field and click on the button to (hopefully) render the last and first name of the corresponding student.

## Using `fetch` to request the student's name

Given a student's v-number, `vnum`, construct a request and submit that request using `fetch`. At first glance, this is a simple matter, just 
```js 
// this won't work
// declare a function getStudnet and have it fetch the data
const getStudent = () => {
    const data = fetch("http://localhost:3000/users?vnum=120");
    }
``` 
right? No. The `fetch` function does not return response that we can directly assign to the const `data`. Instead, it returns a `Promise`. A promise object eventually yeilds the promised quantity (so in this case, the promised response from the users endpoint) but it cannot be expected to do so immediately. Accordingly, any actions we would like to take on the promised quantity must only be taken when the Promise resolves itself. 

### Method #1: Using the `async` functions with `await`
We can use the `await` keyword to indicate that we are assigning the promise returned by `fetch` to some variable. However, we cannot use the `await` keyword outside of an `async` function (there is one exception but that is an advanced topic).
```js
// we are declaring a function getStudent. We modify the declaration using 
const getStudent = async () => {
    const data = await fetch("http://localhost:3000/users?vnum=120");
    }
```

The async modifier to the function declaration tells other parts of the program that may use this function that it should be treated asynchronously, that is, other operations should be able to run (so long as they don't depend on the function) while the function does its work. Now, we need to do something with that data once it arrives. So we can add to the function:

```js
// we are declaring a function getStudent. We modify the declaration using 
const getStudent = async () => {
    const data = await fetch("http://localhost:3000/users?vnum=120");
    const response = await data.json();
    // setStudentData is a state function and it sets the value of its corresponding state variable
    setStudentData({...response_data});
    }
```

### Method #2: Using the Promise.then() Function

Another, arguably more intuitive, way to achieve this result is to use the `then()` function exposed by a js `Promise`. Because the return value of `fetch` is a `Promise` we can take action once the promise is resolved using its `then` function. Similarly, because the return value of the response's `json()` function is a promise, we can take action once the promise is resolved using its `then` function:

```js
const getStudent () => {
    fetch("http://localhost:3000/users?vnum=123").then(
        (data) => {
            data.json().then(
                (response) => {
                    setStudentData({...response});
                }); 
    });
}
```

Because `then()` functions are used to specify behavior that happens immidiately after the resolution of a Promise, their argument is a function itself. Note that I prefer to use a function with no name (anonymous function) which, amongst other syntaxes can be declared using "arrow" notation: `(args) => {logic}`. The args given to the anonymous function correspond to the resolved quantity from the promise against which we are invoking `then`. 

## Learn More About the `fetch` Function
[See this easy to follow tutorial](https://rapidapi.com/guides/fetch-api-react)

[See the API Docs if you want to dive deep](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)