import React, { useEffect, useState } from 'react'
import './staffHome.css'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/common/Navbar';
import axios from '../../axios'
import { Loading } from '../../components/common/Loading';
import { useSelector,useDispatch } from 'react-redux';
import { stafflogout } from '../../redux/staff/staffAction';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
const StaffHome = () => {
  const user=useSelector((state)=>state.staff.staff.staffmail);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logout=()=>{
    dispatch(stafflogout());
    navigate("/");
  }
  const [data,setData]=useState({});
  const [loading,setLoading]=useState(true)
  const organisation=useSelector(state=>state.staff.staff.organisation)
  useEffect(()=>{
    axios.post('/staffs/home',{organisation}).then((res)=>{
        setData(res.data)    
    })
    setLoading(false);
  },[])
  useEffect(()=>{
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCounter = () => {
        const target = counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 2;
        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}`;
          setTimeout(updateCounter, 50);
        } else counter.innerText = target;
      };
      updateCounter();
    });
  },[data])
  return (
    <div className='staffHomeContainer'>
      <Navbar data={user} logout={logout}></Navbar>
      {
        loading ? (<Loading></Loading>) : (
          <div className='staffHomeWrapper'>
            <div className='bloodInfo'>
                <div className='infoCard'>
                  <p className='counter' data-target={data.registered}>0</p>
                  <h3 >Donor Regsitered</h3>
                </div>
                <div className='infoCard'>
                  <p className='counter' data-target={data.sucess}>0</p>
                  <h3 >Successfull Donations</h3>
                </div>
                <div className='infoCard'>
                  <p className='counter' data-target={data.failed}>0</p>
                  <h3 >Rejected Donors</h3>
                </div>
                <div className='infoCard'>
                  <p className='counter' data-target={data.bloodUnits}>0</p>
                  <h3 >Blood Units Collected</h3>
                </div>
            </div>
            <div className='staffButtonContainer'>
              <div className='staffButton' onClick={()=>navigate('/blood_donors')}>
                <PeopleOutlineIcon></PeopleOutlineIcon>
                <p>Blood Donors</p>
              </div>
              <div className='staffButton' onClick={()=>navigate('/waiting_recipients')}>
                <LocalHospitalIcon></LocalHospitalIcon>
                <p>Blood Recipients</p>
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  )
}

export default StaffHome
