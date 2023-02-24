import React from 'react'
import './staffLogin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Message from '../../components/Message';
import { useDispatch ,useSelector} from 'react-redux';
import { stafflogin } from '../../redux/staff/staffAction';
const StaffLogin = () => {
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState({
      content:"",
      condition:false

    });
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [data,setData]=useState({
        staffmail:"",
        staffpassword:""
      });
      const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
      }
      const Login=(e)=>{
        e.preventDefault();
        axios.post("/staffs/login",{data}).then((res)=>{
          if(res.data.data.staffmail==data.staffmail){
            let json={
              organisation:res.data.data.organisation,
              staffmail:res.data.data.staffmail
            }
            dispatch(stafflogin(json))
            localStorage.setItem("staff",JSON.stringify(json));
            setSuccess(true);
            setTimeout(()=>{        
              navigate('/staffs/home');
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
    <div className='staff-login-container'>
    <form className='staff-login-form' onSubmit={Login}>
      <h3>Staff Login</h3>
      <div className='input-container'>
        <PersonIcon/>
        <input type='email' autocomplete='off' placeholder='Email' name='staffmail' onChange={handleChange} value={data.email} required/>
      </div>
      <div className='input-container'>
        <LockIcon/>
        <input type='password' placeholder='Password' name='staffpassword' onChange={handleChange} value={data.password} className='password' required/>
      </div>
      <div className='container'>
        <div className='checkbox-container'>
            <input type='checkbox' onClick={showPassword}/>
            <label>Show passsword</label>
        </div>
      </div>
      <input type="submit" className='submit-btn'/>
    </form>
  </div>
  </>
  )
}

export default StaffLogin
