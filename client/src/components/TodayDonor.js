import React, { useEffect,useState} from 'react'
import './todayDonor.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import axios from '../axios'
import { useSelector } from 'react-redux';
const TodayDonor = ({bloodDonor,updateDonors}) => {
    const [active,setActive]=useState(false);
    const donorId=bloodDonor._id;
    const Model = () => {
      const [rejectActive,setrejectActive]=useState(false);
      const [rejectReason,setRejectReason]=useState({
      isFever:false,
      isHighBloodPressure:false,
      isTattooInBody:false,
      isDiabetics:false,
      isBleeding:false,
      isCold:false,
    })
    const RejectPopup=()=>{
      const handleRejectReasonChange=(e)=>{
        setRejectReason({...rejectReason,[e.target.name]:!rejectReason[e.target.name]})
      }
      const handleRejectReason=(e)=>{
        e.preventDefault();
        axios.post('/reject/donor',{donorId,rejectReason}).then((res)=>{
        }).catch((err)=>console.log(err));
        setrejectActive(!rejectActive)
        setActive(false)
        updateDonors(donorId)
      }
      return (
          <form className="rejectCheckboxContainer" onSubmit={handleRejectReason}>
            <div className="rejectCheckboxWrapper">
              <div>
                <input type="checkbox" name='isFever' checked={rejectReason.isFever} onChange={handleRejectReasonChange}/>
                <label>High Fever</label>
              </div>
              <div>
                <input type="checkbox" name='isHighBloodPressure' checked={rejectReason.isHighBloodPressure} onChange={handleRejectReasonChange}/>
                <label>High Blood Pressure</label>
              </div>                  
              <div>
                <input type="checkbox" name='isTattooInBody' checked={rejectReason.isTattooInBody} onChange={handleRejectReasonChange}/>
                <label>Tattoo in body</label>
              </div>                  
              <div>
                <input type="checkbox" name='isDiabetics' checked={rejectReason.isDiabetics} onChange={handleRejectReasonChange}/>
                <label>Diabetics</label>
              </div>                  
              <div>
                <input type="checkbox" name='isCold' checked={rejectReason.isCold} onChange={handleRejectReasonChange}/>
                <label>Cold</label>
              </div>                  
              <div>
                <input type="checkbox" name='isBleeding' checked={rejectReason.isBleeding} onChange={handleRejectReasonChange}/>
                <label>Bleeding</label>
              </div>
              </div>
              <div className='popupButtons'>
                <button className='back' onClick={()=>setrejectActive(!rejectActive)}><ArrowBackIcon/>Back</button>
                <button className='submit' type='submit'><DoneIcon/>Submit</button>
              </div>
          </form>
      )
    }
      const staff=useSelector(state=>state.staff.staff)
      let blood={
        donorId:bloodDonor._id,
        units:1,
        staffHandled:staff._id,
        organisation:staff.organisation,
        bloodGroup:bloodDonor.bloodGroup,
        component:"",
        donationDate:"",
        expiryDate:"",
      };
     useEffect(()=>{
      let currentDate = new Date(Date.now());
      let donationDate=currentDate.getDate(),donationMonth=currentDate.getMonth()+1,donationYear=currentDate.getFullYear();
      if(donationDate<10) donationDate="0"+donationDate;
      if(donationMonth<10) donationMonth="0"+donationMonth;
      blood["donationDate"]=donationYear+"-"+donationMonth+"-"+donationDate;
     },[])
      const handleAccept=(e)=>{
        e.preventDefault();
        const map=new Map();
        map.set("RBC",42);
        map.set("Plasma",365);
        map.set("Platelets",5);
        map.forEach((value,key)=>{
          let nextDate = new Date(Date.now() + value * 86400000);
          let endDate=nextDate.getDate(),endMonth=nextDate.getMonth()+1,endYear=nextDate.getFullYear();
          if(endDate<10) endDate="0"+endDate;
          if(endMonth<10) endMonth="0"+endMonth;
          map.set(key,endYear+"-"+endMonth+"-"+endDate)
        })
        const donationType=bloodDonor.donationType;
        if(donationType=="Whole Blood Donation"){
           map.forEach((value,key)=>{
            blood["expiryDate"]=value;
            blood["component"]=key;
            axios.post('/blood/new',{blood}).then((res)=>console.log(res)).catch(err=>console.warn(err));
            console.log(blood)
           })
        }
        else if(donationType=="Powered Red Donation"){
          map.forEach((value,key)=>{
            blood["expiryDate"]=value;
            blood["component"]=key;
            blood["units"]=2;
            axios.post('/blood/new',{blood}).then((res)=>console.log(res)).catch(err=>console.warn(err));

           })
        }else if(donationType=="Plasma Donation"){
          // setBlood({...blood,component:"Plasma",expiryDate:map.get("Plasma")});
          blood["component"]="Plasma";
          blood["expiryDate"]=map.get("Plasma");
          axios.post('/blood/new',{blood}).then((res)=>console.log(res)).catch(err=>console.warn(err));


        }
        else if(donationType=='Platelets Donation'){
          blood["component"]="Platelets";
          blood["expiryDate"]=map.get("Platelets");
        axios.post('/blood/new',{blood}).then((res)=>console.log(res)).catch(err=>console.warn(err));

        }
        axios.post('/accept/donor',{donorId}).then((res)=>console.log(res)).catch((err)=>console.log(err));
        updateDonors(donorId)
        setActive(false)
      }

        return (
          <div className='modelContainer'>
              <div className="modelTitle">
                <h3>Donor Application</h3>
                <CloseOutlinedIcon onClick={()=>setActive(false)}/>
              </div>
              <div className="modelBody">
                <div>
                    <h4>Donor Name:</h4>
                    <span>{bloodDonor.donorName}</span>
                </div>
                
                <div>
                    <h4>Gender:</h4>
                    <span>{bloodDonor.gender}</span>
                </div>
                <div>
                    <h4>Blood Group:</h4>
                    <span>{bloodDonor.bloodGroup}</span>
                </div>
                <div>
                    <h4>Blood Type:</h4>
                    <span>{bloodDonor.donationType}</span>
                </div>
                <div>
                    <h4>Mobile Number:</h4>
                    <span>{bloodDonor.mobileNumber}</span>
                </div>
                <div>
                    <h4>Address:</h4>
                    <span>{bloodDonor.address}</span>
                </div>
                <div>
                    <h4>PinCode:</h4>
                    <span>{bloodDonor.pincode}</span>
                </div>
              </div>
              <div className="modelFooter">
                <div className='buttonContainer'>
                  <button className='accept' onClick={handleAccept}>Accept</button>
                  <button className='reject' onClick={()=>setrejectActive(!rejectActive)}>Reject</button>
                </div>
              </div>
              {rejectActive&&<RejectPopup/>}
          </div>
        )
      }    
        
  return (
    <div className='todayDonorContainer'>
      <div className="left">
        <strong>{bloodDonor.donorName}</strong>
        <p>{bloodDonor.aadharNumber}</p>
      </div>
    <div className="middle">
        <span>{bloodDonor.gender}</span>
        <p>{bloodDonor.donationType}</p>
        <p>{bloodDonor.bloodGroup}</p>
    </div>
    <div className="right">
        <button onClick={()=>setActive(!active)}>View</button>
    </div>
    {active && <Model />}
    </div>
  )
}

export default TodayDonor
