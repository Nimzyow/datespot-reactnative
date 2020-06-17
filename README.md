# Note

This is the React Native version of DateSpot. A previous attempt of creating DateSpot with React Native was done with the Expo build tools.

I decided to start this project again but with vanilla React Native as there were a few issues with Expo that felt really off to me. I have detailed those issues in the readme of that repo which can be found [here](https://github.com/Nimzyow/datespot-reactnative-expo)

The initial commit for this repo kicks off from the end of the Expo version and I will continue working with vanilla React Native from here on out.

TODO:

# DateSpot

So you're in a relationship, or perhaps you matched in an online dating app. That's fantastic but what do you do now? Where do you go for your date? Isn't it stressful to setup and plan the date? Well, stress no more as we have you covered with curated dates based on the location of your choosing!:) :)

![heart](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/logo.jpg)

## Table of content

- [Installation](#installation)
- [Testing](#testing)
- [Running the application](#running-the-application)
- [Tech stack](#tech-stack)
- [Extra notes](#extra-notes)

## Installation

### Backend

The server for this application was created when the desktop version of DateSpot was made. The desktop version and the React Native version uses the same server. As such, you will need to go to the DateSpot repo, [found here](https://github.com/Nimzyow/datespot), clone it and only **follow the instructions in the README for installing the backend** and then **follow the instructions in the README for setting up the database**.

You can also run the tests for the backend by following the testing instructions for the backend in the README of the link above.

### React Native

Please visit [the official React Native getting started page](https://reactnative.dev/docs/environment-setup) and follow the **React Native CLI Quickstart** instructions NOT the Expo CLI Quickstart instructions.

Please follow the instructions only until the Creating a new application section.

This application was made for iOS primarily so I recommend following the instructions for "Target OS of iOS". This means that you will need to run this on a mac.

Having done that, follow these steps to install required dependencies:

1. In the root of the project, type the following in your terminal:

```
$ npm install
```

Phew! That must have been a bit of a journey so give yourself a pat on the back. well done :)

## Testing

Follow these steps to run the tests:

1. In the root of the project, type the following in your terminal:

```
$ npm test
```

That's it! You should be able to see the tests.

## Running the application

As noted near the beginning of this README, the server was created when the desktop version was made. The desktop version and the React Native version uses the same server. If you haven't done so already, you will need to go to the DateSpot repo, [found here](https://github.com/Nimzyow/datespot), clone it and only **follow the instructions in the README for installing the backend** and then **follow the instructions in the README for setting up the database**.

Only when that is done, follow these instructions:

To run the server:

1. In the root directory of the server, type the following in your terminal:

```
$ npm run server-dev
```

Yay! You just turned on the server for this project! This won't do us much good though as you won't be able to see anything. Good if you want to test the end points in Postman though! But hey, let's fire up React Native.

Open another instance of your terminal and Follow these steps to run React Native:

1. In the root of the React Native project, type the following in your terminal:

```
$ npm start
```

This will start the metro bundler

2. Open another instance of your terminal and In the root of the React Native project, type the following in your terminal:

```
$ npx react-native run-ios
```

Great! So now you may have to wait a bit and you should see the application running on a simulator that's just popped up. Enjoy!

## Planning

This was a group project done for the presentation day at Makers Academy. It involved us giving a presentation on a project we worked. We were given just over a week to come up with an idea and create an application in just over a week.

The original backend was done in Rails using a SQL database and the front end was done in React using Reacts Context API for state management. I was resposible for the front end.

I wanted more responsibilites in the backend and thought it would be a great exercise to rip out the Rails backend and convert that to a JavaScript backend using Node.js, Express.js and MongoDB as the DB. I also successfully switched Reacts Context API to Redux for state management through the process of TDD. I believe the TDD process was the highlight of that project.

To further demonstrate my TDD capabilities and to create something really cool, I thought I would create a React Native version of the desktop application made in React. This time though I would be using react-native-testing-library to showcase my TDD abilities and to broaden my testing framework knowledge.

So the aim was not only to create a React Native application but to thoroughly test it as well. I believe this is the mark of a good developer.

## Tech stack

- JavaScript
- React Native (hooks)
- Redux
- Jest
- react-native-testing-library
- react-navigation
- Node
- Express
- Supertest
- chai
- nyc
- MongoDB
- Mongoose
- eslint
- prettier

## Extra notes

Though it may seem simple to create the React Native version of DateSpot since the desktop version of React is done already, there are still challenges im facing a long the way that keeps me sharp and allows me to learn by doing.

An example is learning to use react-native-testing-library to perform my tests and mocking AsyncStorage for unit testing.

It's proving to be a very interesting experience and I look forward to expanding my knowledge further the more I TDD with React Native.
