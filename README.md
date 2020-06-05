# fitness-tracker 💪

A full stack web app for tracking daily workout routines. The app uses Express web server and mongodb for data persistence and Mongoose ORM.

- [Demo](#Demo)
- [Deployed app URL](#Deployed-app-URL)
- [Usage](#Usage)
- [Dependencies](#Dependencies)

## Demo

![](/demo.gif)

## Deployed app URL

https://fitness-tracker-mongo-app.herokuapp.com/

## Usage

- Click on the deployed app link.
- Add a new workout or add an exercise to the last workout.

- Click on the dashboard link to view statistics for the last week including the following charts / graphs.

  - Line chart of daily accumulative exercise durations of both cardio and resistance exercises.

  - Bar chart of daily accumulative weights lifted calculated from the weight multiplied by the repetitions and sets for resistance exercises.

  - A pie chart of the exercise durations broken down by the exercise type.

  - A doughnut chart of the weights lifted per each resistance exercise.

## Dependencies

The app uses the following node modules.

- Express
- Mongoose
- Morgan
