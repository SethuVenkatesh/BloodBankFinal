import React, { useEffect, useState } from 'react'
import './bloodDonors.css'
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

import TodayDonor from '../../components/TodayDonor';
import { useSelector,useDispatch} from 'react-redux';
import { stafflogout } from '../../redux/staff/staffAction';
import { Navbar } from '../../components/common/Navbar';
import { ProcessedDonor } from '../../components/ProcessedDonor';
const BloodDonors = () => {
    const organisation=useSelector(state=>state.staff.staff.organisation);
    const user=useSelector((state)=>state.staff.staff.staffmail);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logout=()=>{
      dispatch(stafflogout());
      navigate("/");
    }
   const [todayDonors,settodayDonors]=useState([]);
    const [processedDonors,setProcessedDonors]=useState([]);
    const [tab1,setTab1]=useState(true)
    useEffect(()=>{
      let currentDate = new Date(Date.now());
      let donationDate=currentDate.getDate(),donationMonth=currentDate.getMonth()+1,donationYear=currentDate.getFullYear();
      if(donationDate<10) donationDate="0"+donationDate;
      if(donationMonth<10) donationMonth="0"+donationMonth;
      let today=donationYear+"-"+donationMonth+"-"+donationDate
        axios.post("/blood_donors/today",{organisation,today})
        .then((res)=>{
            settodayDonors(res.data.data)
        })
        .catch((err)=>console.log(err))
        axios.post("/blood_donors/all",{organisation})
        .then((res)=>{
            setProcessedDonors(res.data.data)
        })
        .catch((err)=>console.log(err))
        
       
    },[])
    const updateDonors=(id)=>{
     const updatedBloodDonors=todayDonors.filter(bloodDonor=>bloodDonor._id!=id);
     settodayDonors(updatedBloodDonors)
    }
    const handleTab=(tab)=>{
      const tabs=document.querySelectorAll(".tab");
      tabs.forEach((tab)=>{
        tab.classList.remove("active");
      })
      document.getElementsByClassName(tab)[0].classList.add("active");
     if(tab=="tab1"){
      setTab1(true);
     }     
     else{
      setTab1(false);
     }
    }
  return (
    <div className='bloodDonorsContainer'>
      <Navbar data={user} logout={logout}></Navbar>
      <div className="bloodDonorsWrapper">
        <div className='tabContainer'>
          <div className='active tab tab1' onClick={()=>handleTab("tab1")}>Today Donors</div>
          <div className='tab tab2' onClick={()=>handleTab("tab2")}>Processed Donors</div>
        </div>
        <div className='tabContentContainer'>
        {
            tab1 ?
            (<div className='tabContent-1'>
            {
              todayDonors.length>=1 ? (todayDonors.map(bloodDonor => <TodayDonor bloodDonor={bloodDonor} updateDonors={updateDonors}/>)):<h4 className='alert'>No Blood Donors Today</h4>
            }   
            </div>)
            :
            (
              <div className='tabContent-2'>
                {
                  processedDonors.length >=1 ? (processedDonors.map(processedDonor=><ProcessedDonor donor={processedDonor}></ProcessedDonor>)) : <h4 className='alert'>No Processed Donrs</h4>
                }
              </div>
            )
        }
        </div>
        
      </div>
    </div>

  )
}

export default BloodDonors
