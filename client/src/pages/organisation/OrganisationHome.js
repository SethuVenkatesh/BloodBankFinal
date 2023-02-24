import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import './organisationHome.css'
import axios from '../../axios'
import { Navbar } from '../../components/common/Navbar'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Loading } from '../../components/common/Loading'
import { Modal } from '../../components/common/Modal'
import { organisationlogout } from '../../redux/organisation/organisationAction'
const OrganisationHome = () => {
  const user=useSelector((state)=>state.organisation.organisation);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logout=()=>{
    dispatch(organisationlogout());
    navigate("/");
  }
  const [organisation,setorganisation]=useState("");
  const [expiredBlood,setExpiredBlood]=useState("");
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState({});
  const orgEmail =useSelector(state=>state.organisation.organisation)
  const [modal,setModal]=useState(false);
    const handleModal=()=>{
        setModal(!modal);
    }
  useEffect(()=>{
    axios.post('/find_organisation',{orgEmail}).then((res)=>
    {
      setorganisation(res.data.data.organisationname)
    }).catch((err)=>console.log(err))
    
   
  },[])
  useEffect(()=>{
    axios.post('/staffs/home',{organisation}).then((res)=>{
      setData(res.data)    
      setLoading(false);
    })
  },[organisation])
  useEffect(()=>{
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCounter = () => {
        const target = counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 2;
        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}`;
          setTimeout(updateCounter, 50);
        } else counter.innerText = target;
      };
      updateCounter();
    });
  },[data])
    const handleAddStaff=()=>{
      navigate('/staffs/signup');
    }
    const handleExpiredBloods=()=>{
      axios.post('/expired_blood',{organisation}).then((res)=>{
         setExpiredBlood(res.data.expired);
         setModal(!modal)
      }).catch(err=>console.log(err));
    }
  return (
    <>
   
    <div className='organisationHomeContainer'>
      <Navbar data={user} logout={logout}></Navbar>
      {
        loading ? <Loading></Loading> :(
          <>
          <div className='staffHomeWrapper'>
          <div className='bloodInfo'>
              <div className='infoCard'>
                <p className='counter' data-target={data.registered}>0</p>
                <h3 >Donor Regsitered</h3>
              </div>
              <div className='infoCard'>
                <p className='counter' data-target={data.sucess}>0</p>
                <h3 >Successfull Donations</h3>
              </div>
              <div className='infoCard'>
                <p className='counter' data-target={data.failed}>0</p>
                <h3 >Rejected Donors</h3>
              </div>
              <div className='infoCard'>
                <p className='counter' data-target={data.bloodUnits}>0</p>
                <h3 >Blood Units Collected</h3>
              </div>
          </div>
        </div>
        <div className='organisationButtonWrapper'>
          <div className='organisationButton' onClick={handleAddStaff}>
            <GroupAddIcon></GroupAddIcon>
            <p>Add Staffs</p>
          </div>
          <div className='organisationButton' onClick={handleExpiredBloods}>
            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
            <p>Remove Expired Bloods</p>
          </div>
          <div className='organisationButton' onClick={()=>navigate('/expired_blood/all')}>
            <RemoveRedEyeIcon></RemoveRedEyeIcon>
            <p>View Expired Bloods</p>
          </div>
      </div>
      </>
        )
      }


      
    </div>
    {
      modal && 
    <Modal title="Expired Bloods" handleModal={handleModal}>
        <span style={{display:"flow-root"}}> Total No of blood Removed : <p style={{fontWeight:"bold",color:"red",fontSize:"20px"}}>{expiredBlood}</p></span>
    </Modal>
    }
    </>
  )
}
export default OrganisationHome
