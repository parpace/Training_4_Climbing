import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from './Calendar'
import Header from './Header'
import Metrics from './Metrics'
// import axios from 'axios'

export default function UserHome () {
    const loggedInUser = localStorage.getItem('loggedInUser')
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) { navigate(`/`) }
    }, [loggedInUser, navigate])
    
    return (
        <>
            <Header loggedInUser={loggedInUser}/>
            <Calendar loggedInUser={loggedInUser}/>
            <Metrics loggedInUser={loggedInUser}/>
        </>
    )
}

// const [plannedWorkouts, setPlannedWorkouts] = useState([])
    // const [loggedWorkouts, setLoggedWorkouts] = useState([])

    // useEffect(() => {
    //     const fetchWorkouts = async () => {
    //     try {
    //         // const response = await axios.get(`http://localhost:3001/users/${loggedInUser}`)
    //         const response = await axios.get(`http://localhost:3001/users/6680988b6c20dd2c850556b8`)
    //         const user = response.data

    //         const formatWorkouts = (workouts) => 
    //         workouts.map(workout => ({
    //             title: workout.workouts.map(w => w.name).join(', '),
    //             start: new Date(workout.date),
    //             end: new Date(workout.date),
    //             workouts: workout.workouts
    //         }))

    //         setPlannedWorkouts(formatWorkouts(user.plannedWorkouts))
    //         setLoggedWorkouts(formatWorkouts(user.loggedWorkouts))
    //     } catch (error) {
    //         console.error('Error fetching workouts:', error)
    //     }
    //     }
    //     fetchWorkouts()
    // }, [])