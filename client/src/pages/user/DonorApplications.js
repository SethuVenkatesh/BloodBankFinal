import React, { useEffect,useState } from 'react'
import './donorApplication.css'
import DonorCard from '../../components/DonorCard'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Navbar } from '../../components/common/Navbar'
import { userlogout } from '../../redux/user/userAction'

const DonorApplications = () => {
  const [application,setApplication] = useState([]);
  const userEmail=useSelector(state=>state.user.user);
  const user=useSelector(state=>state.user.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logout=()=>{
    dispatch(userlogout())
    navigate("/");
  }
  useEffect(()=>{
      axios.post("donor_registration/all",{userEmail}).then((res)=>{
      setApplication(res.data)
    }
  )},[]);
  return (
    <div className='donorApplicationContainer'>
      <Navbar logout={logout} data={user}></Navbar>
      <div className="donorApplicationWrapper">
        {
          application.map((detail)=>{
           return <DonorCard detail={detail}/>
          })
        }
      </div>
    </div>
  )
}

export default DonorApplications
