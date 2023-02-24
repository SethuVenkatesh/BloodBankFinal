import React from 'react'
import {useState} from 'react'
import axios from '../../axios'
import {useNavigate} from "react-router-dom"
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

import './organisationSignup.css'
import Message from '../../components/Message';
const Organisation_signup = () => {
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const navigate=useNavigate();
  const [data,setData]=useState({
    organisationname:"",
    organisationmail:"",
    organisationpassword:"",
  });
  const orgCreation=(e)=>{
    e.preventDefault();
    axios
      .post("/organisations/new", { data })
      .then(() => {
        setData({
        organisationname:"",
        organisationmail:"",
        organisationpassword:"" 
        });
        alert("Organisation Created succesfully");
        setSuccess(true);
        setTimeout(()=>{        
          navigate('/organisations/login');
          setSuccess(false);
      },1000)

      })
      .catch((error) => {
        setError(true);
        setTimeout(()=>{        
          setError(false);
      },1000)
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
    {success && <Message backgroundColor="green" content="Organisation created successfully" />}
  { error && <Message backgroundColor="red" content="Something went Wrong"/>}
    <div className='organisation-signup-container'>
      <form className='organisation-signup-form' onSubmit={orgCreation}>
        <h3>Organisation Sign Up</h3>
        <div className='input-container'>
          <PersonIcon/>
          <input type='text' autocomplete='off' placeholder='Organisation Name' name='organisationname' onChange={handleChange} value={data.organisationname} required="required"/>
        </div>
        <div className='input-container'>
          <EmailIcon/>
          <input type='email' autocomplete='off' placeholder='Email' name='organisationmail' onChange={handleChange} value={data.email} required="required" />
        </div>
        <div className='input-container'>
          <LockIcon/>
          <input type='password' placeholder='Password' name='organisationpassword' onChange={handleChange} value={data.password} className='password' required="required" />
        </div>
        <div className='container'>
        <div className='checkbox-container'>
            <input type='checkbox' onClick={showPassword}/>
            <label>Show passsword</label>
        </div>
        <div className='redirect-container' onClick={()=>
          
          navigate("/organisations/login")}>
            <p>Already have an Organisation Account</p>
        </div>
      </div>
      <input type="submit" className='submit-btn'/>
      </form>
    </div>
    </>
    
  )
}

export default Organisation_signup
