import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Home = () => {
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.user);
  const staff=useSelector(state=>state.staff.staff);
  const organisation=useSelector(state=>state.organisation.organisation);
  function loginHandle(mail,accountType){
    if(accountType==='user'){
      if(mail){
        navigate('/users/home')
      }
      else{
        navigate('/users/login')
      }
    }
    else if(accountType==='staff'){
      if(mail){
        navigate('/staffs/home')
      }
      else{
        navigate('/staffs/login')
      }
    }
    else{
      if(mail){
        navigate('/organisations/home')
      }
      else{
        navigate('/organisations/login')
      }
    }
  }
  return (
    <div className='homeContainer'>
      <div className="homeWrapper">
        <button onClick={()=>loginHandle(user,"user")}>User</button>
        <button onClick={()=>loginHandle(staff,"staff")}>Staff</button>
        <button onClick={()=>loginHandle(organisation,"organisation")}>Organisation</button>
      </div>
    </div>
  )
}

export default Home
