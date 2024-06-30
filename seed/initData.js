const db = require('../db')
const User = require('../models/user')
const Workout = require('../models/workout')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
  try {
      await Workout.deleteMany({})
      // await User.deleteMany({})
      console.log('All collection reset')
  } catch (error) {
      console.error('Error resetting collections:', error)
  }
}

const main = async () => {

  await resetCollections()
    
  // const user1 = new User({
  //   username: 'parpace',
  //   password: 'parpace',
  //   email: 'parpace@gmail.com',
  //   profileName: 'parpace'
  // })
  // await user1.save()

  // const user2 = new User({
  //   username: 'parker',
  //   password: 'parker',
  //   email: 'parker@gmail.com',
  //   profileName: 'parker'
  // })
  // await user2.save()

  const workoutArray = [
    {
      category: 'Anaerobic Climbing',
      name: 'Limit Bouldering',
      description: 'Limit Bouldering',
      fields: {
        totalDuration: "String"
      },
      notes: ''
    },
    {
      category: 'Aerobic Climbing',
      name: 'Limit Sport climbing',
      description: 'Sport Climbing',
      fields: {
        totalDuration: "String"
      },
      notes: ''
    },
    {
      category: 'Strength Training',
      name: 'Weighted Pull Ups',
      description: 'Pull Ups with weight added',
      fields: {
        sets: "Number",
        reps: "Number",
        restBetweenSets: "String"
      },
      notes: ''
    },
    {
      category: 'Finger Training',
      name: 'Max Hangs',
      description: 'Max weighted Hangs',
      fields: {
        edgeSize: "String",
        gripType: "String",
        isometricDuration: "String"
      },
      notes: ''
    }
  ]

await Workout.insertMany(workoutArray)
  console.log('Created workouts!')
}

const run = async () => {
    await main()
    db.close()
}

run()