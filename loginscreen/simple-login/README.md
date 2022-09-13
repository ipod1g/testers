# Riot games login screen project

<aside>
💡 Login screen inspired by Riot Games Client https://testers4bono.netlify.app/

</aside>

# Summary

---

### Skills used

-  HTML
-  CSS
-  JavaScript
-  React
-  npm
-  Netlify

### Notable functions

-  Replica of Riot Games Client
-  Local login authorization (update with axios soon)
-  Interactive UI

# Process

---

### Initial

-  Started with importing necessary assets and building the login form
-  Made various states to replicate the behavior of the interaction
   -  Error message and UI
   -  Focus interaction - on floating label animation
   -  Password toggle view
-  Added personal touch on maintaining the aspect ratio of the hero art upon responsive rescaling

### Problems

-  Faced difficulties on constructing input handler + animation - tried to use components to simplify the code blocks but the life cycle was confusing
   -  callback functions not put to use in the end
-  Using onChange the inputs are recognized 1 input later than wanted, hence brought useEffect to play
-  Overuse of useState and useEffect due to difficulties with child-parent communication
   -  Caused confusions when trying to manage crowded changes on interaction
   -  Error was checked on parent but the cycle was immutable? on child upon passing
-  Had bug after pressing button and using keyboard input causing a random border appearing on it → :focus-visible had inherent outline
   -  Introduced focus state
-  Faced troubles with deployment, but fixed with creating netlify.toml file locally
   -  Had to include not only redirect but build command here too
-  Issues with non secured http font link… solved by using import/link to @fontface
-  setSelectionRange was not working by function of onClick → useEffect resolved it without using it for cursor focus

### Lessons

-  Introduction to component based coding with React
   -  Refactored after achieveing the result interaction
-  Utilized React Hooks and knowledge of React components for more manageable code

# Version check

---

-  v1.0.0
   -  Deployed on 3 Sep 2022
   -  Complete login form interactions and resolved all known bugs
      -  Does not include version button and touch interactions yet
   -  Simple authorization in hard coded data base
   -  Partially responsive design
-  v1.1.0
   -  Updated on 5 Sep 2022
   -  Started refactoring for cleaner and efficient code → Utilize more of React components and less complexity in jsx file
      -  Live-shared with Sim Ho for review session

# Future implementation

---

-  Will upgrade to use back end for database management in the future
-  Support fully responsive design by adding my touch - since source login screen doesn’t support responsive design

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
