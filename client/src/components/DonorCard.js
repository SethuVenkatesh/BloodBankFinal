import React from 'react'
import './donorCard.css'
import { useState } from 'react';
import DetailsModal from './DetailsModal';
const DonorCard = ({detail}) => {
  const [modalOpen,setmodalOpen]=useState(false);
  return (
    <div className='donorCardcontainer'>
      <div className="cardTop">
          <h4>{detail.donorName}</h4>
          <p>{detail.aadharNumber}</p>
      </div>
      <div className="cardMiddle">
          <p>{detail.bloodGroup}</p>
          <p>{detail.donationType}</p>
          <p className={`status ${detail.donationStatus}`}>{detail.donationStatus}</p>
      </div>
      <div className='view' onClick={()=>setmodalOpen(!modalOpen)}>View</div>
      {
        modalOpen && <DetailsModal detail={detail} setmodalOpen={setmodalOpen}/>
      }
    </div>
  )
}
export default DonorCard
