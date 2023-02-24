import React from 'react'
import { useSelector } from 'react-redux'
import './userHome.css'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/common/Navbar'
import { ImageCorosel } from '../../components/common/ImageCorosel'
import { Tabs } from '../../components/Tabs'
import { Table } from '../../components/common/Table'
import { Loading } from '../../components/common/Loading'
import { userlogout } from '../../redux/user/userAction'
import { useDispatch } from 'react-redux';
const UserHome = () => {
    const navigate=useNavigate();
    const user=useSelector(state=>state.user.user)
    const dispatch=useDispatch();
    const logout=()=>{
      dispatch(userlogout())
      navigate("/");
    }
  return (

    <div className='userHome'>
      {/* <Loading></Loading> */}
      <Navbar logout={logout} data={user}/>
        <ImageCorosel/>
        <div className='buttons'>
          <button onClick={()=>navigate("/donor_registration")}>Donor Registration</button>
          <button onClick={()=>navigate("/donor_registration/all")}>View Donor Application</button>
          <button onClick={()=>navigate("/recipient_registration")}>Blood Request</button>
          <button onClick={()=>navigate("/blood_request/all")}>View Blood Requests</button>
        </div>
        <Tabs></Tabs>
        <div className='learnContainer'>
          <h4>Learn About Donations</h4>
          <div className='learnWrapper'>
              <div className='infoContainer'>
                <img src="https://stanfordbloodcenter.org/wp-content/uploads/2020/06/Blood-facts_10-illustration-graphics__canteen.png"></img>
                <p>After donating blood, the body works to replenish the blood loss. This
              stimulates the production of new blood cells and in turn, helps in maintaining good health.</p>
              </div>
              <div> 
                <p className='types'>Compatible Blood Types</p>
                <Table></Table>
              </div>
          </div>
        </div>
        <div className='homeFooter'>
          <p>
               Visitor No.web statistics© 2016 -2023 by Ministry of Health and Family Welfare<br></br>® Designed and Developed by Centre for Development of Advanced Computing<br></br>Terms & Conditions | Privacy Policy | Accessibility Statement <br></br> Last Updated : Feb 18 2023 | Site Map
          </p>
        </div>
        
    </div>
  )
}

export default UserHome
