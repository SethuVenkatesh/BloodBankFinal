import React, { useEffect } from 'react'
import './donorRegistration.css'
import { useState } from 'react';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Message from '../../components/Message';
import { Navbar } from '../../components/common/Navbar';
import { userlogout } from '../../redux/user/userAction'
const DonorRegistration = () => {
    
    const [date,setDate]=useState("");
    const [organisations,setOrganisations]=useState("");
    const [warning,setWarning]=useState({
        condition:false,
        content:""
    })
    const user=useSelector(state=>state.user.user)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const logout=()=>{
      dispatch(userlogout())
      navigate("/");
    }
    const [donorForm,setDonorForm]=useState({
    });
    useEffect(()=>{
        const currentDate=new Date();
        let nextDate = new Date(Date.now() + 30 * 86400000);
        let startDate=currentDate.getDate(),startMonth=currentDate.getMonth()+1,startYear=currentDate.getFullYear();
        let endDate=nextDate.getDate(),endMonth=nextDate.getMonth()+1,endYear=nextDate.getFullYear();
        if(startDate<10) startDate="0"+startDate;
        if(endDate<10) endDate="0"+endDate;
        if(startMonth<10) startMonth="0"+startMonth;
        if(endMonth<10) endMonth="0"+endMonth;

        setDate({
            minDonationDate:startYear+"-"+startMonth+"-"+startDate,
            maxDonationDate:endYear+"-"+endMonth+"-"+endDate,
        })
        axios.get("/organisation/all")
        .then((res)=>setOrganisations(res.data)).catch((err)=>console.log(err));
        setTimeout(()=>{
            setDonorForm({
                donorName:"",
                gender:"Male",
                aadharNumber:"",
                mobileNumber:"",
                dateOfBirth:"",
                donorAge:1,
                bloodGroup:"O positive",
                donationType:"Whole Blood Donation",
                organisation:"",
                donationDate:"",
                timeSlot:"9:00 AM to 12:00 PM",
                address:"",
                pincode:"",
                userEmail:user,
            })
        },50)
    },[])

    useEffect(()=>{
        setDonorForm({...donorForm,organisation:organisations[0]?.organisationname,donationDate:date.minDonationDate,dateOfBirth:date.minDonationDate})
    },[organisations,date])    
    const handleChange=(e)=>{
        if(e.target.name==="dateOfBirth"){
            var dob=new Date(e.target.value);
            var month_diff = Date.now() - dob.getTime();  
            var age_dt = new Date(month_diff); 
            var year = age_dt.getUTCFullYear();  
            var age = Math.abs(year - 1970);   
            setDonorForm({ ...donorForm, donorAge:age,[e.target.name]: e.target.value});
        }
        else{
            setDonorForm({ ...donorForm, [e.target.name]: e.target.value });
        }
    }
    const donorSubmit=(e)=>{
        e.preventDefault();
        axios.post('donor_registration',{donorForm}).then((res)=>{
            const errorDetails=res.data.data;
            if(errorDetails){
                setWarning({
                    condition:true,
                    content:res.data.data
                })
            }
            else{
                navigate("/users/home")
            }
            setTimeout(()=>{setWarning({condition:false,content:""})},2000)
        }).catch((error)=>{
            console.warn(error);
        })
    }
  return (
    <div>
    <Navbar logout={logout} data={user}></Navbar>
    <div className='donorContainer'>
        {warning.condition&&<Message backgroundColor="orange" content={warning.content}/>}
      <form className='donorForm' onSubmit={donorSubmit}>
        <div className='textContainer'>
            <input type='text' required name='donorName' value={donorForm.donorName} onChange={handleChange}/>
            <label>Donor Name</label>
        </div>
        <div className='categoryContainer'>
            <label>Gender (M/F)</label>
            <div className='radioContainer'>
                <input type='radio' name='gender' onChange={handleChange} value="Male" id='checkbox-1' style={{display:"none"}} checked={donorForm.gender==="Male"}></input>
                <label for='checkbox-1' id='genderLabel'>Male</label>
                <input type='radio' name='gender' onChange={handleChange} value="Female" id='checkbox-2' style={{display:"none"}} checked={donorForm.gender==="Female"}></input>
                <label for='checkbox-2' id='genderLabel'>Female</label>
            </div>
        </div>
        <div className='dateContainer'>
            <label>Select Donor Date of Birth</label>
            <input type='date' name='dateOfBirth' value={donorForm.dateOfBirth} onChange={handleChange} max={donorForm.donationDate} ></input>
        </div>
        <div className='textContainer'>
            <input type='text' name='aadharNumber' value={donorForm.aadharNumber} onChange={handleChange} required/>
            <label>Aadhar Number</label>
        </div>
        <div className='textContainer'>
            <input type='text' required name='mobileNumber' value={donorForm.mobileNumber} onChange={handleChange}/>
            <label>Donor Mobile number</label>
        </div>
        <div className='categoryContainer'>
            <label>Select Blood Group</label>
            <div className='selectContainer'>
                <select name='bloodGroup' value={donorForm.bloodGroup} onChange={handleChange}>
                    <option>O positive</option>
                    <option>O negative</option>
                    <option>A positive</option>
                    <option>A negative</option>
                    <option>B positive</option>
                    <option>B negative</option>
                    <option>AB positive</option>
                    <option>AB negative</option>
                </select>
            </div>
        </div>
        <div className='categoryContainer'>
            <label>Select a Organisation to Donate</label>
            <div className='selectContainer'>
                <select name='organisation' onChange={handleChange}>
                    {organisations && organisations.map((organisation)=>(
                        <option>{organisation.organisationname}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className='dateContainer'>
            <label>Select preferred date to donate</label>
            <input type='date' name='donationDate' value={donorForm.donationDate} onChange={handleChange} min={date.minDonationDate} max={date.maxDonationDate} required></input>
        </div>
        <div className='categoryContainer'>
            <label>Select which you can donate</label>
            <div className='selectContainer'>
                <select name='donationType' onChange={handleChange}>
                    <option>Whole Blood Donation</option>
                    <option>Plasma Donation</option>
                    <option>Platelets Donation</option>
                </select>
            </div>
        </div>
        <div className='categoryContainer'>
            <label>Select a Preferred Time Slot</label>
            <div className='selectContainer'>
                <select name='timeSlot' onChange={handleChange}>
                    <option>9:00 AM to 12:00PM</option>
                    <option>3:00 PM to 6:00PM</option>
                </select>
            </div>
        </div>
        <div className='textContainer'>
            <input type='text' required name='address' value={donorForm.address} onChange={handleChange}/>
            <label>Donor Address</label>
        </div>
        <div className='textContainer'>
            <input type='text' required name='pincode' value={donorForm.pincode} onChange={handleChange}/>
            <label>Donor Pincode</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
    </div>
  )
}

export default DonorRegistration
