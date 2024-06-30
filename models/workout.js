const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  fields: { type: Map, of: String },
  notes: { type: String }
})

module.exports = mongoose.model('Workout', WorkoutSchema)