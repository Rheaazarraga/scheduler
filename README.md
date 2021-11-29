# Interview Scheduler
---
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Purpose
---
This project by [Rhea Azarraga](https://github.com/Rheaazarraga) is created as part of the [Lighthouse Labs](https://www.lighthouselabs.ca) curriculum. It is not intended for professional use. 

## Dependencies
---
- axios ^0.24.0
- classnames ^2.2.6
- normalize.css ^8.0.1
- react ^16.9.0
- react-dom ^16.9.0
- react-hooks-testing-library ^0.6.0
- react-scripts 3.0.0
- storybook ^5.0.10
- node-sass ^4.14.0
- library/jest-dom ^4.0.0

## Final Product
---
https://user-images.githubusercontent.com/84409001/143960034-c42f3f4f-341b-45a3-8a81-d649f8b15c2e.mp4

![scheduler1](https://user-images.githubusercontent.com/84409001/143956428-d512f8cb-c363-40cd-a008-680d81925fff.png)
![scheduler2](https://user-images.githubusercontent.com/84409001/143956434-a8343f2a-95f0-4a78-8c6b-9ada1672dd52.png)

## Setup
---

- Install dependencies with `npm install`. 

- Fork and clone the [Scheduler API](https://github.com/lighthouse-labs/scheduler-api) project outside of the Scheduler project directory.

## Running Webpack Development Server
---

```sh
npm start
```

## Running Jest Test Framework
---

```sh
npm test
```

## Running Storybook Visual Testbed
---

```sh
npm run storybook
```
