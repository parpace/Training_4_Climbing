const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profileName: { type: String },
  plannedWorkouts: [{
    date: Date,
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }]
  }],
  loggedWorkouts: [{ 
    date: Date,
    workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }] 
  }]
})

module.exports = mongoose.model('User', UserSchema)