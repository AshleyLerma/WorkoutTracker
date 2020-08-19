const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes

// route to get / exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

// route to get / stats page
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// API Routes

// route to get workout data
// TODO: sort?
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route to create workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route to continue workout
app.put("/api/workouts/:id", ({ body }, res) => {
  db.Exercise.create(body)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        {},
        { $push: { exercises: _id } },
        { new: true }
      )
    )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route to get stats
// TODO: sort?
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
