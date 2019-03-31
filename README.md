# MeanStack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Welcome to the MEAN Stack

The mean stack is intended to provide a simple and fun starting point for cloud native fullstack javascript applications.   
MEAN is a set of Open Source components that together, provide an end-to-end framework for building dynamic web applications; starting from the top (code running in the browser) to the bottom (database). The stack is made up of:

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **A**ngular (formerly Angular.js): Front-end web app framework; runs your JavaScript code in the user's browser, allowing your application UI to be dynamic
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) -- Recommended version 10.5.3 TLS.  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` 
git clone https://github.com/drumfreak/mean-mat-stack
cd mean-mat-stack
npm install
cp nodemon.example.json nodemon.json
```

Next, modify /nodemon.json for any changes you may need such as :

```
{
  "env" : {
    "JWT_KEY" : "ASDF@AWERLK@LK@#LK!_@#ASDFL@K@#FLASDL@!!!!!!L:AASFKFF",
    "MONGO_CONNECT_URL" : "mongodb://localhost:27017/meandemo"
  }
}
```

Additionally, if you're running your Angular frontend on a different host, you may want to modify your `/src/environments/environments.ts` or `environments.prod.ts` to update the apiURL and hostUrl.

* Dev example:

```
apiUrl: 'http://someHost:4040/api',
hostUrl: 'http://someHost:4040'
```

* Production example:

```
apiUrl: 'http://someHost.com/api',
hostUrl: 'http://someHost.com'
```

* Now for development, simply run: 

```
npm start
```

Access your development host via `http://localhost:4040`


# Optional / Additional Info

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
