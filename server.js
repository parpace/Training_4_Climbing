const express = require('express')
const cors = require('cors');
const bodyParser = require(`body-parser`)
const logger = require(`morgan`)

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(logger(`dev`))

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

const UserController = require('./controllers/UserController')
const WorkoutController = require('./controllers/WorkoutController')

app.get('/', (req, res) => res.send('This is our landing page!'))

app.get('/users', UserController.getAllUsers)
app.get('/users/:id', UserController.getUserById)

app.get('/workouts', WorkoutController.getAllWorkouts)
app.get('/workouts/:id', WorkoutController.getWorkoutById)

app.get('/:userId/plannedWorkouts', UserController.getPlannedWorkouts)
app.get('/:userId/loggedWorkouts', UserController.getLoggedWorkouts)

app.post('/addPlannedWorkout/:userId', UserController.addPlannedWorkout)
app.post('/addLoggedWorkout/:userId', UserController.addLoggedWorkout)