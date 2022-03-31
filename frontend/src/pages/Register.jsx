import React from 'react'
import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom' // used for re-direction
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

// useSelector is used to select something (e.g: user, isLoading, isError etc.) from the state 
// useDispatch - if we want to dispatch functions like asyncThunk function 'register' or reducer function 'reset'
// we use useDispatch

const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>
        state.auth
    )

    useEffect(()=>{
        if(isError){
            toast(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset());

    }, [user,  isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            toast.error('Passwords do not match')
        }else{
            const userData = {
                name, 
                email,
                password
            }
            dispatch(register(userData))
        }
    }
if(isLoading){
    return <Spinner></Spinner>
}
  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                     <input  
                        type="text"
                        className='fom-control'
                        id='name'
                        name='name'
                        value={name} 
                        placeholder='Please enter your name' 
                        onChange={onChange}/>
                </div>
                <div className="form-group">
                     <input  
                        type="email"
                        className='fom-control'
                        id='email'
                        name='email'
                        value={email} 
                        placeholder='Please enter your email' 
                        onChange={onChange}/>
                </div>
                <div className="form-group">
                     <input  
                        type="password"
                        className='fom-control'
                        id='password'
                        name='password'
                        value={password} 
                        placeholder='Please enter password' 
                        onChange={onChange}/>
                </div>
                <div className="form-group">
                     <input  
                        type="password"
                        className='fom-control'
                        id='password2'
                        name='password2'
                        value={password2} 
                        placeholder='Please Confirm password' 
                        onChange={onChange}/>
                </div>
               <div className="form-group">
                   <button type="submit" className='btn btn-block'>Submit</button>
               </div>
            </form>
        </section>
    </>
  )
}

export default Register