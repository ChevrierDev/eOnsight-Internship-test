# Full Stack Assessment Test

## Overview

This assessment test is designed to :

- evaluate your ability to deliver a simple web application based on the following tech stack: `Django, ReactJS/VueJS, PostgreSQL, and PostGIS`. You can choose another front framework/library if you find it more suitable for the exercise.
- test your capability to develop new features such as interactive widgets for displaying basic statistics.
- test your ability to deliver *good* code, in other words:
  - **modular**,
  - **readable**,
  - **maintainable**,
  - **well-documented**,
  - **reproducible** code.
- test your **User Experience (UX) intuition** and **creativity** in terms of usability and design of the frontend components.

**Context:** We have a set of infrastructure data, such as bridges ([sample_bridges.csv](./sample_bridges.csv)) and we want to *use* them in an app.

**Objective:** Develop a simple web application that allows users to view and analyze the data with interactive widgets showing statistics in the form of charts.

**Estimated duration:** 2-6 hours

### Submission Instructions

Please submit your code as a **Git repository** containing all necessary files that you think will satisfy our criteria above.

## Tasks

### Part 1: Set up the PostgreSQL + PostGIS database

Set up a PostgreSQL database with PostGIS extension and load the data from the CSV file `sample_bridges.csv` into it.
This is not a core part of the test, i.e. you will not be evaluated on how to set up the database. That is why we provide detailed instructions on how to set up the database in [`SETUP_DATABASE.md`](./SETUP_DATABASE.md).

### Part 2: Backend Development (Django mandatory)

Here starts the core part of the test. Django is a popular web framework for building web applications. In this part of the test, we ask you to create a Django project that will load the data from the previously created database.

We also ask you to use the `Django REST Framework` to **create API endpoints** for:

- Listing all bridges.
- Retrieving details of a single bridge.
- Adding a new bridge.
- Updating the details of an existing bridge.
- Deleting a bridge.

### Part 3: Frontend Development (ReactJS/VueJS recommanded)

#### Set up a front-end project

- You may choose the framework that you thinks best suits the task (e.g. ReactJS, VueJS,...)
- Create a component that fetches the list of bridges from the backend API and displays them in a table. Each row in the table should display the bridge's name, location (in the format latitude and longitude), inspection date, status, and traffic load.

#### Create Interactive Widgets

- Create a component that displays a pie chart of bridge statuses (e.g., the number of bridges in 'Good', 'Fair', 'Poor', and 'Bad' condition).
- You may use a charting library e.g. Chart.js, D3.js to render these charts.

#### Frontend / Backend interaction

- Create a form that allows users to add a new bridge or update an existing bridge's details.
- The form should include fields for the bridge's name, location (latitude and longitude input), inspection date, status, and traffic load.
- Use the form to make POST/PUT requests to the backend API.

*Happy coding!*
