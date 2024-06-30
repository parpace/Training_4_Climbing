const Workout = require('../models/workout')

const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find()
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id)
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' })
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllWorkouts,
    getWorkoutById
}
