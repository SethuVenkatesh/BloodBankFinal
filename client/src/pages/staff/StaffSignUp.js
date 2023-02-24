import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from '../../axios'
import {useNavigate} from "react-router-dom"
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

import './staffSignUp.css'
import Message from '../../components/Message';
import { useSelector } from 'react-redux';
const Staffs_signup = () => {
  const orgEmail =useSelector(state=>state.organisation.organisation)
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const navigate=useNavigate();
  const [data,setData]=useState({
    staffname:"",
    staffmail:"",
    staffpassword:"",
    organisation:"",
  });
  const staffCreation=(e)=>{
    e.preventDefault();
    axios
      .post("/staffs/new", { data })
      .then(() => {
        setData({
        staffname:"",
        staffmail:"",
        staffpassword:"" ,
        organisation:"",
        });
        alert("Staffs Created succesfully");
        setSuccess(true);
        setTimeout(()=>{        
          navigate('/organisations/home');
          setSuccess(false);
      },1000)

      })
      .catch((error) => {
        setError(true);
        setTimeout(()=>{        
          setError(false);
      },2000)
      alert(error.message)
      }
      );
  }
  useEffect(()=>{
    axios.post('/find_organisation',{orgEmail})
            .then((res)=>{
                setData({...data,organisation:res.data.data.organisationname})
            })
            .catch(err=>console.log(err))
  },[])
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
    {success && <Message backgroundColor="green" content="Staff created successfully" />}
  { error && <Message backgroundColor="red" content="Something went Wrong"/>}
    <div className='staff-signup-container'>
      <form className='staff-signup-form' onSubmit={staffCreation}>
        <h3>Staff Sign Up</h3>
        <div className='input-container'>
          <PersonIcon/>
          <input type='text' autocomplete='off' placeholder='Staff Name' name='staffname' onChange={handleChange} value={data.staffname} required="required"/>
        </div>
        <div className='input-container'>
          <EmailIcon/>
          <input type='email' autocomplete='off' placeholder='Email' name='staffmail' onChange={handleChange} value={data.email} required="required" />
        </div>
        <div className='input-container'>
          <LockIcon/>
          <input type='password' placeholder='Password' name='staffpassword' onChange={handleChange} value={data.password} className='password' required="required" />
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

export default Staffs_signup
