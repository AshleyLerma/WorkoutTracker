const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  // creates type
  type: String,

  // creates name
  name: String,

  // creates duration
  duration: Number,

  // creates distance
  distance: Number,

  // creates weight
  weight: Number,

  // creates reps
  reps: Number,

  // creates sets
  sets: Number,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
