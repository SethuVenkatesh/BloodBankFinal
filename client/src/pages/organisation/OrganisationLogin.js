import React from 'react'
import './organisationLogin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Message from '../../components/Message';
import { useDispatch } from 'react-redux';
import { organisationlogin } from '../../redux/organisation/organisationAction';
const OrganisationLogin = () => {
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState({
      content:"",
      condition:false

    });
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setData]=useState({
        organisationmail:"",
        organisationpassword:""
      });
      const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
      }
      const OrgLogin=(e)=>{
        e.preventDefault();
        axios.post("/organisations/login",{data}).then((res)=>{
          if(res.data.data==data.organisationmail){
            dispatch(organisationlogin(res.data.data))
            localStorage.setItem("organisation",res.data.data)
            setSuccess(true);
            setTimeout(()=>{        
              navigate('/organisations/home');
              setSuccess(false);
          },1000)
          }
          else{
            alert(res.data.data)
            setError({
              content:res.data.data,
              condition:true
            });
          }
            setTimeout(()=>{
                setError({
                  content:"",
                  condition:false
                })
            },2000)
           
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
    <div className='organisation-login-container'>
    <form className='organisation-login-form' onSubmit={OrgLogin}>
      <h3>Organisation Login</h3>
      <div className='input-container'>
        <PersonIcon/>
        <input type='email' autocomplete='off' placeholder='Email' name='organisationmail' onChange={handleChange} value={data.email} required/>
      </div>
      <div className='input-container'>
        <LockIcon/>
        <input type='password' placeholder='Password' name='organisationpassword' onChange={handleChange} value={data.password} className='password' required/>
      </div>
      <div className='container'>
        <div className='checkbox-container'>
            <input type='checkbox' onClick={showPassword}/>
            <label>Show passsword</label>
        </div>
        <div className='redirect-container' onClick={()=>navigate("/organisations/signup")}>
            <p>Create an Organisation account</p>
        </div>
      </div>
      <input type="submit" className='submit-btn'/>
    </form>
  </div>
  </>
  )
}

export default OrganisationLogin;
