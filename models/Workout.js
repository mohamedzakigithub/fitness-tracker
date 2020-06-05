const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Number,
    default: new Date(),
  },
  exercises: Array,
});

WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  this.exercises.forEach((element) => {
    totalDuration = totalDuration + element.duration;
  });
  return totalDuration;
});

WorkoutSchema.set("toJSON", {
  virtuals: true,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
