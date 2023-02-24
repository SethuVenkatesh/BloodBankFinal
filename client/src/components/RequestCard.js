import axios from '../axios';
import React from 'react'
import './requestCard.css'
import { useNavigate } from 'react-router-dom';
const RequestCard = ({blood,organisation,requestForm}) => {
  const navigate=useNavigate();
    const handleAccept=()=>{
        axios.post("blood_request/accept",{blood,requestForm,organisation}).then((res)=>console.log(res.data)).catch(err=>console.warn(err));
        navigate('/users/home')
    }
  return (
    <div className='requestCardContainer'>
      <span>{organisation}</span>
      <div className='bloodChips'>
        {
          blood.map((b)=>{
            return <span>{b.bloodGroup}-{b.units}</span>
          })
        }
      </div>
      <button onClick={handleAccept}>Accept</button>
    </div>
  )
}

export default RequestCard
