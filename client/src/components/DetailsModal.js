import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './detailsModal.css'
const DetailsModal=({detail,setmodalOpen})=>{
    const content={
        isFever:"Fever",
        isHighBloodPressure:"High Blood Pressure",
        isTattooInBody:"Tattoo In Body",
        isDiabetics:"Diabetics",
        isBleeding:"Bleeding",
        isCold:"Cold"
    }
    return (
    <div className='modalBackground'>
      <div className='detailsModal'>
        <div className="modalHeader">
            <h4>Donor Details</h4>
            <CloseIcon className='closeIcon' onClick={()=>setmodalOpen(false)}/>
        </div>
        <div className="modalContent">
            <div className="details">
              <h5>Name</h5>
              <p>{detail.donorName}</p>
            </div>
            <div className="details">
              <h5>Gender</h5>
              <p>{detail.gender}</p>
            </div>
            <div className="details">
              <h5>Age</h5>
              <p>{detail.donorAge}</p>
            </div><div className="details">
              <h5>Aadhar Number</h5>
              <p>{detail.aadharNumber}</p>
            </div>
            <div className="details">
              <h5>Organisation</h5>
              <p>{detail.organisation}</p>
            </div><div className="details">
              <h5>Donation Type</h5>
              <p>{detail.donationType}</p>
            </div><div className="details">
              <h5>Donation Date</h5>
              <p>{detail.donationDate}</p>
            </div>
            <div className="details">
              <h5>Mobile Number</h5>
              <p>{detail.mobileNumber}</p>
            </div>
            <div className="details">
              <h5>Address</h5>
              <p>{detail.address}</p>
            </div>
            <div className="details">
              <h5>Pincode</h5>
              <p>{detail.pincode}</p>
            </div>
            <div className="details">
              <h5>Registered Mail Id</h5>
              <p>{detail.userEmail}</p>
            </div>
            <div className='details'>
              <h5>Reason for Rejection</h5>
              <p className='reasons'>
                {
                  detail.rejectReason && Object.keys(detail.rejectReason).map((key, i) => (
                        detail.rejectReason[key] && <p>{content[key]}</p>
                  ))
                }
                </p>
            </div>
        </div>
      </div>
    </div>
    )
  }
  export default DetailsModal;