import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WorkoutModal = ({ event, view, onClose }) => {
  const [workouts, setWorkouts] = useState([])
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [fields, setFields] = useState({})

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/workouts')
        setWorkouts(response.data)
      } catch (error) {
        console.error('Error fetching workouts:', error)
      }
    }
    fetchWorkouts()
  }, [])

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout)
    setFields({})
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFields((prevFields) => ({ ...prevFields, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const workoutData = {
        ...selectedWorkout,
        fields,
        date: event.start,
      }
      await axios.post(`/api/users/${event.userId}/${view}Workouts`, workoutData)
      onClose()
    } catch (error) {
      console.error('Error saving workout:', error)
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event.title}</h2>
        <button onClick={onClose}>Close</button>
        {view === 'planned' && (
          <button onClick={() => handleWorkoutSelect(null)}>Add Workout</button>
        )}
        {view === 'logged' && (
          <button onClick={() => handleWorkoutSelect(null)}>Log Workout</button>
        )}
        {selectedWorkout && (
          <div>
            <h3>{selectedWorkout.name}</h3>
            {Object.keys(selectedWorkout.fields).map((field) => (
              <div key={field}>
                <label>{field}</label>
                <input
                  type="text"
                  name={field}
                  value={fields[field] || ''}
                  onChange={handleFieldChange}
                />
              </div>
            ))}
            {view === 'planned' && (
            <button onClick={handleSave}>Add to Plan</button>
            )}
            {view === 'logged' && (
            <button onClick={handleSave}>Log Workout</button>
            )}
          </div>
        )}
        {!selectedWorkout && (
          <div>
            <h3>Select a Workout</h3>
            <ul>
              {workouts.map((workout) => (
                <li key={workout._id}>
                  <button onClick={() => handleWorkoutSelect(workout)}>
                    {workout.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkoutModal