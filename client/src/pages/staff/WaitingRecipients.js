import React, { useEffect, useState } from 'react'
import './waitingRecipient.css'
import axios from '../../axios'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { stafflogout } from '../../redux/staff/staffAction';
import { Navbar } from '../../components/common/Navbar';
const WaitingRecipients = () => {
    const user=useSelector((state)=>state.staff.staff.staffmail);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logout=()=>{
      dispatch(stafflogout());
      navigate("/");
    }
    const [recipients,setrecipients]=useState([]);
    const [processedRecipients,setProcessedRecipients]=useState([]);
    const [tab1,setTab1]=useState(true);

    const organisation=useSelector(state=>state.staff.staff.organisation)
    useEffect(()=>{
        axios.post('/recipients/all',{organisation}).then((res)=>{
            setrecipients(res.data)
        })
        axios.post('/recipients/sucess',{organisation}).then((res)=>{
            setProcessedRecipients(res.data)
        })
    },[])
    useEffect(()=>{
        axios.post('/recipients/sucess',{organisation}).then((res)=>{
            setProcessedRecipients(res.data)
        })
    },[recipients])
    const handleRecipients=(id)=>{
        const rec=recipients.filter(recipient=>recipient._id!=id);
        setrecipients(rec)
    }
    const handleAccept=(recipient)=>{
        axios.post('/deliver_blood',{recipient}).then((res)=>{
            
        }).catch(err=>console.log(err))
        handleRecipients(recipient._id)
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
    <div className='waitingContainer'>
        <Navbar data={user} logout={logout}></Navbar>
        
      <div className="waitingWrapper">
        <div className='tabContainer'>
          <div className='active tab tab1' onClick={()=>handleTab("tab1")}>Today Donors</div>
          <div className='tab tab2' onClick={()=>handleTab("tab2")}>Processed Donors</div>
        </div>
        {
            tab1 ? (<>
            {
                recipients.length>=1 ? (recipients.map(recipient => <RecipientCard recipient={recipient} handleAccept={handleAccept} edit="edit"></RecipientCard>)):<h4 className='alert'>No Recipients Requests</h4>
            }
            </>):(<>
                {
                processedRecipients.length>=1 ? (processedRecipients.map(recipient => <RecipientCard recipient={recipient} handleAccept={handleAccept} ></RecipientCard>)):<h4 className='alert'>No Processed Recipients Requests</h4>
            }
            </>)
        }
      </div>
    </div>
  )
}
const RecipientCard=({recipient,handleAccept,edit})=>{
    return (
        <div className='recipientCard'>
           {
                Object.keys(recipient).map((key, i) => (
                     (key!="_id"&&key!="__v" && key!="bloodId" && key!='isDelivered') &&
                    <div className='recipientField'>
                        <label>{key}</label>
                        <span>:</span>
                     <p>{recipient[key]}</p>
                    </div>
                 ))
            }
            {
                edit &&   <div className="right">
                                <button onClick={()=>handleAccept(recipient)}>Accept</button>
                        </div>
            }
            
    </div>
    )
    
}
export default WaitingRecipients


// {
//     tab1 ? (<>
//     {
//         recipients.map((recipient)=>())
//     }
//      <div className='recipientCard'>
//         {
//             Object.keys(recipient).map((key, i) => (
//                 (key!="_id"&&key!="__v" && key!="bloodId" && key!='isDelivered') &&
//                 <div className='recipientField'>
//                     <label>{key}</label>
//                     <span>:</span>
//                     <p>{recipient[key]}</p>
//                 </div>
//             ))
//         }
// <div className="right">
//     <button onClick={()=>handleAccept(recipient)}>Accept</button>
// </div>
// </div>
    
//     </>) :(<></>)
// }
