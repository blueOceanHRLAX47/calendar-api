const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors());

const { sequelize, user, saved_recipe, saved_workout, workout, recipe, QueryTypes } = require('../db/models');
const { Op } = require('sequelize');

sequelize.sync({ force: false });

// Give the next week of workouts
app.get('/workouts', (req, res) => {
  saved_workout.findAll({
    where: {
      user_id: req.body.user.id,
      time_on_calendar: {
        [Op.lte]: new Date().setDate(new Date().getDate() + 7),
        [Op.gte]: new Date()
      }
    },
    include: workout
  })
    .then(workouts => {
      res.send(workouts).status(200);
    })
    .catch(err => {
      console.error(err);
      res.send(err).status(500);
    })
});

app.post('/workouts', (req, res) => {
  saved_workout.create({
    user_id: req.body.user.id,
    workout_id: req.body.workout_id,
    time_on_calendar: req.body.time_on_calendar
  })
    .then(result => res.send(result).status(201))
    .catch(err => {
      console.error(err);
      res.send(err).status(500)
    });
});

app.put('/workouts', (req, res) => {
  saved_workout.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(workout => {
      workout.time_on_calendar = req.body.time_on_calendar;
      return workout.save();
    })
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err));
});

app.delete('/workouts/:id', (req, res) => {

  saved_workout.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      return result.destroy();
    })
    .then(result => res.sendStatus(202))
    .catch(err => res.status(500).send(err));
});

// Give the next week of recipes
app.get('/recipes', (req, res) => {
  saved_recipe.findAll({
    where: {
      user_id: req.body.user.id,
      date_on_calendar: {
        [Op.lte]: new Date().setDate(new Date().getDate() + 7),
        [Op.gte]: new Date()
      }
    },
    include: recipe
  })
    .then(recipes => {
      res.send(recipes).status(200);
    })
    .catch(err => {
      console.error(err);
      res.send(err).status(500);
    })
});

app.post('/recipes', (req, res) => {
  saved_recipe.create({
    user_id: req.body.user.id,
    recipe_id: req.body.recipe_id,
    added_to_calendar: true,
    date_on_calendar: req.body.date_on_calendar
  })
    .then(result => res.send(result).status(201))
    .catch(err => res.send(err).status(500));
});

app.put('/recipes', (req, res) => {
  saved_recipe.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(recipe => {
      recipe.date_on_calendar = req.body.date_on_calendar;
      return recipe.save();
    })
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err));
});

app.delete('/recipes/:id', (req, res) => {
  saved_recipe.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      return result.destroy();
    })
    .then(result => {
      res.sendStatus(202);
    })
    .catch(err => res.status(500).send(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
