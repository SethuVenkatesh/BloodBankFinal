import React from 'react'
import './processedDonor.css'
import { Modal } from './common/Modal'
import { useState } from 'react'
export const ProcessedDonor = ({donor}) => {
    const [modal,setModal]=useState(false);
    const handleModal=()=>{
        setModal(!modal);
    }
    const content={
        isFever:"Fever",
        isHighBloodPressure:"High Blood Pressure",
        isTattooInBody:"Tattoo In Body",
        isDiabetics:"Diabetics",
        isBleeding:"Bleeding",
        isCold:"Cold"
    }
  return (
    <>
    <div className='processedDonorContainer' onClick={()=>handleModal()}>
        <div className='left'>
            <span>{donor.donorName}</span>
            <span>{donor.aadharNumber}</span>
        </div>
        <div className='right'>
            <span className={`${donor.donationStatus}`}>{donor.donationStatus}</span>
            <span>{donor.donationDate}</span>
            <span>{donor.bloodGroup}</span>
            <span>{donor.donationType}</span>
        </div>
    </div>
    {
        modal && 
        <Modal handleModal={handleModal} title='Donor Details'>
            {
                Object.keys(donor).map((key, i) => (
                    (key!="_id"&&key!="__v"&&key!='rejectReason') &&
                    <div>
                        <label>{key}</label>
                        <span>:</span>
                        <p>{donor[key]}</p>
                    </div>
                ))
               
            }
            {
               (donor.donationStatus=="rejected")&&
               <div>
                <label>Reject Reason</label>
                <span>:</span>
                {
                    donor.rejectReason && Object.keys(donor.rejectReason).map((key, i) => (
                        donor.rejectReason[key] && <p>{content[key]}</p>
                  ))
                }
               
                </div>

            }
            
        </Modal>
    }
    </>
    
  )
}
