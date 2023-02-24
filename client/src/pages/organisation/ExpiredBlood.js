import React, { useEffect, useState } from 'react'
import './expiredBlood.css'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Navbar } from '../../components/common/Navbar'
import { Loading } from '../../components/common/Loading'
import { Modal } from '../../components/common/Modal'
import { organisationlogout } from '../../redux/organisation/organisationAction'
const ExpiredBlood = () => {
    const [organisation,setorganisation]=useState("");
    const [loading,setloading]=useState(true);
    const orgEmail =useSelector(state=>state.organisation.organisation)
    const [expiredBlood,setexpiredBlood]=useState([])
    const user=useSelector((state)=>state.organisation.organisation);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logout=()=>{
      dispatch(organisationlogout());
      navigate("/");
    }
    useEffect(()=>{
        axios.post('/find_organisation',{orgEmail}).then((res)=>
        {
          setorganisation(res.data.data.organisationname)
    
        }).catch((err)=>console.log(err))
      },[])
    useEffect(()=>{
        axios.post('/expired_blood/all',{organisation}).then((res)=>{
            setexpiredBlood(res.data)
        })
        setTimeout(()=>{
          setloading(false)
        },1000)
    },[organisation])
    console.log(expiredBlood)
  return (
    <div className='expiredBloodContainer'>
      <Navbar data={user} logout={logout} ></Navbar>
      {
        loading ? <Loading></Loading> :( 
        <div className="expiredBloodWrapper">

        {
          <div className='bloodWrapperContainer'>
            {
               expiredBlood.map((blood)=>{
                return (
                    <ExpiredCard blood={blood}></ExpiredCard>
                )
            })
            }
          </div>
           
        }
      </div>
      ) 
      }
     
    </div>
  )
}
const ExpiredCard=({blood})=>{
  const [modal,setModal]=useState(false);
    const handleModal=()=>{
        setModal(!modal);
    }
    return (
      <>
      <div className='card' onClick={handleModal}>
          <div className='top'>
              <span>{blood.donorName}</span>
              <span>{blood.donationDate}</span>
          </div>
          <div className='middle'>
              <span>{blood.bloodGroup}</span>
              <span>{blood.component}</span>
              <span>{blood.units} Units</span>
          </div>
          <div className="bottom">
              <p>Staff Handled:<span>{blood.staffName}</span></p>
          </div>
      </div>
      {
        modal && <Modal title="Blood Details"  handleModal={handleModal}>
             {
                Object.keys(blood).map((key, i) => (
                    (key!="_id"&&key!="__v") &&
                    <div>
                        <label>{key}</label>
                        <span>:</span>
                        <p>{blood[key]}</p>
                    </div>
                ))
            }
        </Modal>
      }
      </>
    )
}
export default ExpiredBlood

