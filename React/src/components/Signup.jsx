import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function Signup () {

    const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    valid: false
    }

    const [formState, setFormState]=useState(initialState)
    const [users, setUsers]=useState([])
    const [message, setMessage]=useState('')
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(`http://localhost:3001/users`)
            setUsers(response.data)
        }
        getUsers()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if(!formState.email || !formState.password || !formState.passwordConfirm || !formState.username) {
            setMessage(`All fields are required`)
            setFailure(true)
            return
        }

        let isDuplicate=false

        if (formState.password !== formState.passwordConfirm) {
            setMessage("Passwords do not match")
            setFailure(true)
        } else if (formState.password.length < 7) {
            setMessage("Password must be at least 9 characters long")
            setFailure(true) }
        else {
            {users.map((user) => {
                if (user.username === formState.username || user.email === formState.email ){
                isDuplicate =true
                } 
            })}
        
            if (isDuplicate) {
                setMessage("username or email already exists") 
                setFailure(true)
            } else {
                formState.valid = true
                console.log(formState)
                setSuccess(true)
                setMessage("Account created!")
                await addNewAccount()
            }
        }
    }   

    const addNewAccount = async () => {
        try {
            const response = await axios.post("http://localhost:3001/users", {
                username: formState.username,
                password: formState.password
            })
            navigate('/')

            if (response.status === 201) {
                alert('Account successfully created! You can now login.')
            } else {
                alert("Failed to add account:", response.statusText)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }
  
    const handleChange=(e) => {
        setFormState({...formState, [e.target.id] : e.target.value})
    }

    return (
        <div className ='signupContainer'>
            <Link to = '/'><button className='backtologinBtn'>Back to Login</button></Link>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                {/* username */}
                <div className='usernameContainer'>
                    <input type='text' id='username' placeholder='Username' onChange={handleChange} value={formState.username} />
                </div>
                {/* email */}
                <div className ='emailContainer'>
                    <input type="text" id="email" placeholder='Email' onChange = {handleChange} value={formState.email}/>
                </div>
                {/* password */}
                <div className='passwordContainer'>
                    <input type='password' id="password" placeholder='Password' onChange = {handleChange} value = {formState.password} />
                </div>
                {/* confirm password */}
                <div className='confirm-passwordContainer'>
                    <input type="password" placeholder="Confirm password" id="passwordConfirm" onChange ={handleChange} value={formState.passwordConfirm} />
                </div>
                <button className='signupSubmitBtn' type="submit" variant='primary'>Sign Up</button>
                <p className={success ? 'valid' : (failure ? 'invalid' : null)}>{message}</p>
            </form>
        </div>
    )
}