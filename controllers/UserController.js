const User = require('../models/user')
const Workout = require('../models/workout')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addPlannedWorkout = async (req, res) => {
    const { userId } = req.params
    const { workoutId, date, fields, notes } = req.body
  
    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      const workout = await Workout.findById(workoutId)
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' })
      }
  
      // Customize the workout fields
      const customizedWorkout = {
        ...workout.toObject(),
        fields: new Map(Object.entries(fields)),
        notes
      }
  
      // Add the customized workout to plannedWorkouts
      user.plannedWorkouts.push({
        date,
        workouts: [customizedWorkout]
      })
  
      await user.save()
  
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

const addLoggedWorkout = async (req, res) => {
    const { userId } = req.params
    const { workoutId, date, fields, notes } = req.body
  
    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      const workout = await Workout.findById(workoutId)
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' })
      }
  
      // Customize the workout fields
      const customizedWorkout = {
        ...workout.toObject(),
        fields: new Map(Object.entries(fields)),
        notes
      }
  
      // Add the customized workout to plannedWorkouts
      user.loggedWorkouts.push({
        date,
        workouts: [customizedWorkout]
      })
  
      await user.save()
  
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addPlannedWorkout,
    addLoggedWorkout
}