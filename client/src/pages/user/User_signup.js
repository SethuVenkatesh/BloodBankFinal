import React from 'react'
import {useState} from 'react'
import axios from '../../axios'
import {useNavigate} from "react-router-dom"
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import './user_signup.css'
import Message from '../../components/Message';
const User_signup = () => {
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const navigate=useNavigate();

  const [data,setData]=useState({
    username:"",
    email:"",
    password:""
  });
  const userCreation=(e)=>{
    e.preventDefault();
    
    axios
      .post("/users/new", { data })
      .then(() => {
        setData({
          username:"",
          email:"",
          password:"" 
        });
        alert("User Created succesfully");
        setSuccess(true);
        setTimeout(()=>{        
          navigate('/users/login');
          setSuccess(false);
      },1000)

      })
      .catch((error) => {
        setError(true);
        setTimeout(()=>{        
          setError(true);
      },2000)
      alert(error.message)
      }
      );
      
      

    
  }

  const handleChange=(e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
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
    {success && <Message backgroundColor="green" content="User created successfully" />}
  { error && <Message backgroundColor="red" content="Something went Wrong"/>}
    <div className='user-signup-container'>
      <form className='user-signup-form' onSubmit={userCreation}>
        <h3>Sign Up</h3>
        <div className='input-container'>
          <PersonIcon/>
          <input type='text' autocomplete='off' placeholder='Username' name='username' onChange={handleChange} value={data.username} required="required"/>
        </div>
        <div className='input-container'>
          <EmailIcon/>
          <input type='email' autocomplete='off' placeholder='Email' name='email' onChange={handleChange} value={data.email} required="required" />
        </div>
        <div className='input-container'>
          <LockIcon/>
          <input type='password' placeholder='Password' name='password' onChange={handleChange} value={data.password} className='password' required="required" />
        </div>
        <div className='container'>
        <div className='checkbox-container'>
            <input type='checkbox' onClick={showPassword}/>
            <label>Show passsword</label>
        </div>
        <div className='redirect-container' onClick={()=>
          
          navigate("/users/login")}>
            <p>Already have an account</p>
        </div>
      </div>
      <input type="submit" className='submit-btn'/>
      </form>
    </div>
    </>
    
  )
}

export default User_signup
