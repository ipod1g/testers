<aside>
💡 Login screen inspired by Riot Games Client [https://testers4bono.netlify.app/](https://testers4bono.netlify.app/)
GitHub Dev Source [https://github.com/ipod1g/testers/tree/main/loginscreen/simple-login](https://github.com/ipod1g/testers/tree/main/loginscreen/simple-login)

</aside>

# Summary

---

### Skills used

-  HTML
-  CSS
-  JavaScript
-  React
   -  Libraries: React Hooks, ReactDom, react-select, react-transition-group, react-router-dom
-  npm
-  Netlify (Frontend) & Heroku (Backend)
-  express, axios, cors
-  Node.js
-  MySQL + sequelize
-  Insomnia, LambdaTest (UI test framework)

### Notable functions

-  Replica of Riot Games Client
-  Registration on MySQL database
-  Server login authorization (no hashing on password yet)
-  Interactive and Responsive UI
-  Optimizations for loading time

# Process

---

### Initial

-  Started with importing necessary assets and building the login form
-  Made various states to replicate the behavior of the interaction
   -  Error message and UI
   -  Focus interaction - on floating label animation
   -  Password toggle view
-  Added personal touch on maintaining the aspect ratio of the hero art upon responsive rescaling
-  Refactor process with Sim Ho and Steve using Live-share for feedback
-  Selected MySQL as the choice of DBMS instead of MongoDB following these info from IBM
   -  **MySQL is well-suited for the following use cases:**
      -  High-traffic sites, such as e-commerce or social sites
      -  Sites that require high security protocols, such as government-based and compliance-heavy industries
   -  **MongoDB is optimal for the following use cases:**
      -  Legacy businesses that seek to upgrade big data
      -  Content management systems (CMS)
      -  High-query sites and applications, such as analytics apps

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
   -  Lazy web font loading causes some render delays
-  setSelectionRange was not working by function of onClick → useEffect resolved it without using it for cursor focus
-  passing object props and recognizing change of state was an issue due to the way react reads it
-  React-select library - blur on selection
-  To improve performance, minify was considered but realized that jsx format doesn’t auto minify on React unlike js
-  Had this funny error with CSS on modal, turns out it was due to a misinputted ; in between the classes that stopped it from reading the styles underneath

### Lessons

-  Introduction to component based coding with React
   -  Refactored after achieving the result interaction
-  Utilized React Hooks and knowledge of React components for more manageable code
-  Used React Portal for modal to maintain event delegation provided but render above all
-  react transition group animation library → had trouble using translate 50% centered for uprising animation
-  used react-select library
-  Utilize Lighthouse to check and optimize performance
   -  Before font preloading
      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e0766cd5-1297-4139-8e89-e6e959e2fc2c/Untitled.png)
   -  After font preloading
      ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/45e4e083-2dac-49ed-9b83-cb12ed166be1/Untitled.png)
-  Setting up a light-weight backend with Node.js + MySQL
   -  Learnt deploying with Heroku
   -  Dealing with requests, response
   -  Insomnia to check for backend functions
-  On deployment, iOS device had input value not filling bug
   -  Turns out it was stylesheet reset and was re-deployed
      -  [https://stackoverflow.com/questions/25610517/ios-devices-issues-with-html-form-input-type-text](https://stackoverflow.com/questions/25610517/ios-devices-issues-with-html-form-input-type-text)

# Version check

---

-  v1.0.0
   -  Deployed on 3 Sep 2022
   -  Complete login form interactions and resolved all known bugs
      -  Does not include version button and touch interactions yet
   -  Simple authorization in hard coded data base
   -  Partially responsive design - only on the hero splash art
-  v1.1.0
   -  Updated on 5 Sep 2022
   -  Started refactoring for cleaner and efficient code → Utilize more of React components and less complexity in jsx file
      -  Live-shared with Sim Ho for review session
-  v1.2.0
   -  Updated on 12 Sep 2022
   -  Introduce settings & navigation menu on the right-side
      -  Includes modal menu and selection option
         -  Does not actually change the language yet
-  v2.1.0
   -  Updated on 17 Sep 2022
   -  Introduce registration page
      -  UI designed with reference from Riot Games
   -  Login form now interacts with a backend (Node.js + MySQL)
      -  Deployed with Heroku
   -  Minor clean-up of coding
   -  Slight upgrade to responsive design
      -  Modal still needs work
   -  Password toggle bug on iOS devices
-  v2.1.1
   -  Updated on 18 Sep 2022
   -  Update registration page styling
   -  Modal responsiveness upgrade
   -  Password toggle bug still present on iOS
   -  Update Favicon

# Future implementation

---

-  Bug fix on iOS mobile devices
-  Login loading response
