# Title
Mod 2 + The Overlook Hotel 

## Table of Contents
  - [Abstract](#abstract)
  - [Technologies](#technologies)
  - [Install & Setup](#setup)
  - [Code Architecture](#code-architecture)
  - [Illustrations](#illustrations)
  - [Project Specs](#project-specs)

## Abstract
Welcome to the Overlook Hotel! The goal of this project was to create a hotel management tool for customers. This application allows loyal Overlook customers to view their past trips, get excited by a library of upcoming trips, and book a new stay. By logging in to a customer's personal account they'll be reminded of the painted skies at the Overlook.

## Technologies
- Javascript
- eslint
- node
- Atom
- Mocha
- Chai
- WebPack
- API
- CSS/SCSS
- WAI-ARIA
- HTML 

## Setup
- Fork a copy of this repo 
- Clone it down to your local machine
- From your command line, install the library dependencies using `npm install`
- To view the application, run `npm start` from your command line and `http://localhost:8080/` in your browser

- To run the api used by this application, fork and clone the `overlook-api` repo [HERE](https://github.com/turingschool-examples/overlook-api)
- Install library dependencies in the command line using `npm install`
- Open a new tab in the command line and run `npm start`
  
- To login to the application:
- Username is `customer<any number between 1-50>`
- Password is `overlook2021`
  
- For example: 
  `Username: customer32
   Password: overlook2021`

## Code Architecture
Object Oriented Programming (OOP) was used in this application.

Data and methods created and tested using the following classes:
- `src/classes/Hotel.js`
- `src/classes/Customer.js`

Tests for classes:
- `test/hotel-test.js`
- `test/customer-test.js`

API calls:
- `src/apiCalls.js`

DOM manipulation:
- `src/domUpdates.js`

Main scripts:
- `src/scripts.js`

Styling:
- `src/css/_variables.scss`
- `src/css/base.scss`
- `dist/index.html`

## Illustrations
![Overlook App gif](https://media.giphy.com/media/EI5lqbdExSEfSpky45/giphy.gif?cid=790b7611f18d47cac63347f12506643f0e2ca2441a3e6e78&rid=giphy.gif&ct=g)


## Wins
- Test Driven Development (TDD)! By using `Mocha` and `Chai` I was able to troubleshoot bugs in the isolation of the command line rather than taking all of the steps to navigate to the appropriate areas and recreate tricky scenarios in the browser. Most of these issues were worked out in the testing environment before being built out into the main scripts file. Later in this project, an unexpected issue in a customer's ability to book multiple nights occurred. This was not caught in the testing phase, though. Because the testing environment had already been established, I was able to recreate issue using `Mocha` and `Chai` tooling in the command line rather than troubleshooting in the application's browser. This saved me an incredible amount of time and headaches. 
- Accessibility! Using `WAI-ARIA`, this application has a 100% accessibility rating using the `Lighthouse` auditing system in Google Chrome dev tools. Complimentary colors and layout were also chosen for users experiencing color blindness. This was tested using the Chrome extension `Dalton`.


## Improvements
- Timeline: This application was created in one week. Because of this, much of the styling (such as the room mini-cards) and content (room descriptions) are still in development.
- Canceling a booking: While a customer can successfully cancel a trip using a `DELETE` fetch request, this happens quickly! In future iterations, a customer would be redirected to a confirmation page prompting the user to identify if they are sure they want to cancel the booking or if they have changed their mind and want to keep it afterall. 
- Logging Out: In future iterations, a logout button will return a user to the application as it exists on page load.
- Management Tooling: Future iterations of this project could build out functionality for hotels to manage bookings and customer stays.

## Project Specs
 - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/overlook.html)




