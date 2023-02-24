import React, { useState,useEffect } from 'react'
import './bloodRequest.css'
import Message from '../../components/Message';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import axios from '../../axios';
import RequestCard from '../../components/RequestCard';
import { userlogout } from '../../redux/user/userAction';
import { Navbar } from '../../components/common/Navbar';
const BloodRequest = () => {
    const user=useSelector(state=>state.user.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const logout=()=>{
        dispatch(userlogout())
        navigate("/");
    }
    const [warning,setWarning]=useState(false);
    const [availableBlood,setavailableBlood]=useState([])
    const [requestForm,setrequestForm]=useState({
        patientName:"",
        reason:"",
        bloodGroup:"O positive",
        bloodComponent:"RBC",
        units:"",
        requestDate:"",
        deliveryAddress:"",
        userEmail:user,
    })
    useEffect(()=>{
        let currentDate = new Date(Date.now());
        let donationDate=currentDate.getDate(),donationMonth=currentDate.getMonth()+1,donationYear=currentDate.getFullYear();
        if(donationDate<10) donationDate="0"+donationDate;
        if(donationMonth<10) donationMonth="0"+donationMonth;
        setrequestForm({...requestForm,requestDate:donationYear+"-"+donationMonth+"-"+donationDate});
       },[])
    const handleChange=(e)=>{
        setrequestForm({ ...requestForm, [e.target.name]: e.target.value });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('blood_request',{requestForm}).then((res)=>{
            if(res.data.length>=1)
            {
                setavailableBlood(res.data);
            }
            else{
                setWarning(true);
                setInterval(() => {
                    setWarning(false)
                }, 5000);
                
            }
        }
        ).catch(err=>console.warn(err))
        
        
    }
  return (
    <div className='requestContainer'>
        <Navbar logout={logout} data={user}></Navbar>
        {warning && <Message backgroundColor="orange" content="No Bloods are available for your request"/>}
      <form className="requestWrapper" onSubmit={handleSubmit}>
        <h4>Blood Request</h4>
        <div className='textContainer'>
            <input type='text' name='patientName' value={requestForm.patientName} onChange={handleChange} required/>
            <label>Patient Name</label>
        </div>
        <div className='textContainer'>
            <input type='text' name='reason' value={requestForm.reason} onChange={handleChange} required/>
            <label>Reason for Blood Needed</label>
        </div>
        <div className='categoryContainer'>
            <label>Select Blood Group</label>
            <div className='selectContainer'>
                <select name='bloodGroup' onChange={handleChange}>
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
            <label>Select which you can donate</label>
            <div className='selectContainer'>
                <select name='bloodComponent' onChange={handleChange}>
                    <option>RBC</option>
                    <option>Plasma</option>
                    <option>Platelets</option>
                </select>
            </div>
        </div>
        <div className='textContainer'>
            <input type='number' name='units' value={requestForm.units} onChange={handleChange} required/>
            <label>Blood Units Needed</label>
        </div>
        <div className='textContainer'>
            <input type='text' name='deliveryAddress' value={requestForm.deliveryAddress} onChange={handleChange} required/>
            <label>Enter the Hosipital address</label>
        </div>
        <button>Request</button>
      </form>
      { availableBlood.length>=1 && <h4 className='title'>Available Bloods</h4>}
      <div className="bloodContainer">
        {   
            availableBlood.map((blood)=>{
                if(blood[1].length>=1){
                    return <RequestCard blood={blood[1]} organisation={blood[0]} requestForm={requestForm}/>
                }
            })
        }
      </div>
    </div>
  )
}

export default BloodRequest
