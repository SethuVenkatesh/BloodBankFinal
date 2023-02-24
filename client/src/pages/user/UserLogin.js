import React from 'react'
import './userLogin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Message from '../../components/Message';
import { useDispatch,useSelector } from 'react-redux';
import { userlogin } from '../../redux/user/userAction';
const UserLogin = () => {
  const dispatch=useDispatch();
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState({
      content:"",
      condition:false

    });
    const navigate=useNavigate();
    const [data,setData]=useState({
        email:"",
        password:""
      });
      const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
      }
      const Login=(e)=>{
        e.preventDefault();
        axios.post("/users/login",{data}).then((res)=>{
          if(res.data.data==data.email){
            dispatch(userlogin(res.data.data))
            localStorage.setItem("user",res.data.data);
            setSuccess(true);
            setTimeout(()=>{        
              navigate('/users/home');
              setSuccess(false);
          },1000)
          }
          else{
            alert(res.data.data)
            setError({
              content:res.data.data,
              condition:true
            });
            setTimeout(()=>{
              setError({
                content:"",
                condition:false
              })
          },2000)
          }
        })
        .catch((err)=>{
            alert(err)
        })
      }
      const showPassword=()=>{
        var x=document.querySelector(".password");
        if(x.type == "password"){
            x.type="text";
        }
        else{
            x.type="password";
        }
      }
  return (
    <>
     {success && <Message backgroundColor="green" content="Logged in successfully" />}
      { error.condition && <Message backgroundColor="red" content={error.content}/>}
    <div className='user-login-container'>
    <form className='user-login-form' onSubmit={Login}>
      <h3>Login</h3>
      <div className='input-container'>
        <PersonIcon/>
        <input type='email' autocomplete='off' placeholder='Email' name='email' onChange={handleChange} value={data.email} required/>
      </div>
      <div className='input-container'>
        <LockIcon/>
        <input type='password' placeholder='Password' name='password' onChange={handleChange} value={data.password} className='password' required/>
      </div>
      <div className='container'>
        <div className='checkbox-container'>
            <input type='checkbox' onClick={showPassword}/>
            <label>Show passsword</label>
        </div>
        <div className='redirect-container' onClick={()=>navigate("/users/signup")}>
            <p>Create an account</p>
        </div>
      </div>
      <input type="submit" className='submit-btn' />
    </form>
  </div>
  </>
  )
}

export default UserLogin
