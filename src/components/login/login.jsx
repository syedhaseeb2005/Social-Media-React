import logincall from '../../ApiCalls'
import './Login.css'
import { useContext, useRef, useState } from 'react'
import {Authcontext} from '../../context/Authcontext'
import {useNavigate} from 'react-router-dom'
export default function Login() {
  const email = useRef(); 
  const password = useRef(); 
  const [loginmsg , setloginmsg] = useState('')
  const navigate = useNavigate() 
  const {dispatch} = useContext(Authcontext)
  const handleclick = (e) => {
    e.preventDefault();
    logincall(
        {email : email.current.value ,password : password.current.value},dispatch);
        setloginmsg('You are Login Successfully')
        setTimeout(()=>navigate('/'),3000)
        // alert('Welcome you are Logged In')
  }  
  // console.log(user);
  // console.log(email)
  // console.log(password)

  return (
    <div className="login" style={{background:'#0b111e',color:'#fff'}}>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Syed Social</h3>
                <span className="loginDesc">
                    Connect with Friends & the world around you on Syed Social. 
                </span>
            </div>
            <div className="loginRight">
              <form className='loginbox' onSubmit={handleclick}>
                <input 
                type='email' 
                ref={email} 
                required 
                placeholder='Enter Your Email...' 
                className='LoginInput' />

                <input 
                type='password' 
                ref={password} 
                required 
                placeholder='Enter Your Password...' 
                minLength={6}
                className='LoginInput' />

                <button className='LoginButton'>Log In</button>
                <p style={{textAlign:'center',color:"green",fontWeight:'bold'}}>{loginmsg}</p>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">Create a new Account</button>
              </form>
            </div>
        </div>
    </div>
  )
}

