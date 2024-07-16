import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header ({ loggedInUser }) {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const getUserInfo = async (userId) => {
      const response = await axios.get(`http://localhost:3001/users/${userId}`)
      setUserInfo(response.data)
    }
    getUserInfo(loggedInUser)
  }, [loggedInUser])
  
  return (
    <div className="header">
      <h1>Hello {userInfo.username}</h1>
    </div>
  )
}