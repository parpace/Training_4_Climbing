import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login () {
  const loggedInUser = localStorage.getItem('loggedInUser')
  
  const initialState = {
    username: '',
    password: '',
    error: ''
  }

  const [formState, setFormState] = useState(initialState)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser) {
      const redirectToUserProfile = async (user) => {
        try {
          const userResponse = await axios.get(`http://localhost:3001/users/${user}`)
          navigate(`/username/${userResponse.data.username}`)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
      redirectToUserProfile(loggedInUser)
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`)
        setUsers(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('user does not exixt', error)
      }
    }
    getUsers()
  }, [loggedInUser, navigate])

  const getUserId = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`)
      
      localStorage.setItem('loggedInUser', userId)
      navigate(`/username/${response.username}`)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const user = users.find(user => user.username === formState.username)
    
    // Checks if user exists
    if (!user) {
      setFormState({
        ...formState,
        error: 'Username does not exist'
      })
      return
    }
    // Checks Password
    if (user.password !== formState.password) {
      setFormState({
        ...formState,
        error: 'Incorrect Password'
      })
      return
    }
    getUserId(user._id)
  }
  const handleChange = (e) => {
    setFormState({...formState,
      [e.target.id] : e.target.value,
      error:''
    })
  }
  return (
    <div className="welcomeContainer">

      <div className="loginTitleContainer">
        <h1>Training_4_Climbing</h1>
        <p>Plan | Track | Learn</p>
      </div>

      <form className="loginContainer" onSubmit={handleSubmit}>
        <div className="usernameLogin">
        <input type="text" id="username" placeholder="User Name" onChange={handleChange} value={formState.username} />
        </div>

        <div className="passwordLogin">
          <input type="password" id="password" placeholder="Enter your password" onChange={handleChange} value={formState.password} />
        </div>

        {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}

        <div className="submitBtnContainer">
          <button className="submitBtn" type="submit">Log in</button>
        </div>
        
        <div className="signupBtnContainer">
          <hr/> 
          <h4>Need an account?</h4>
          <Link className="signupBtn" to='/signup'><button>Sign up Here</button></Link>
        </div>
      </form>
    </div>
  )
}