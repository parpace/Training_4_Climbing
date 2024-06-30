import React, { useState, useEffect } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import axios from 'axios'
import WorkoutModal from './WorkoutModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Calendar = ({ loggedInUser }) => {
  const [dayWorkouts, setDayWorkouts] = useState([])
  const [view, setView] = useState('planned')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (loggedInUser) {
      fetchEvents(loggedInUser)
    }
  }, [view])

  const fetchEvents = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/${userId}/${view}Workouts`)
      const dayWorkouts = response.data.map((workout) => ({
        title: workout.name,
        start: new Date(workout.date),
        end: new Date(workout.date),
        workout,
      }))
      setDayWorkouts(dayWorkouts)
    } catch (error) {
      console.error('Error fetching dayWorkouts:', error)
    }
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
    setShowModal(false)
  }

  return (
    <div>
      <div>
        <button onClick={() => setView('planned')}>Plan</button>
        <button onClick={() => setView('logged')}>Log</button>
      </div>
      <BigCalendar
        localizer={localizer}
        events={dayWorkouts}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh' }}
        onSelectEvent={handleEventClick}
      />
      {showModal && (
        <WorkoutModal
          event={selectedEvent}
          view={view}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default Calendar