import React from 'react'
import './app.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home'
import User_signup from './pages/user/User_signup';
import UserLogin from './pages/user/UserLogin';
import UserHome from './pages/user/UserHome';
import Organisation_signup from './pages/organisation/OrganisationSignup';
import OrganisationLogin from './pages/organisation/OrganisationLogin';
import OrganisationHome from './pages/organisation/OrganisationHome';
import Staffs_signup from './pages/staff/StaffSignUp';
import StaffLogin from './pages/staff/StaffLogin';
import StaffHome from './pages/staff/StaffHome';
import DonorRegistration from './pages/user/DonorRegistration';
import DonorApplications from './pages/user/DonorApplications';
import BloodDonors from './pages/staff/BloodDonors';
import { useSelector } from 'react-redux';
import BloodRequest from './pages/user/BloodRequest';
import RequestApplication from './pages/user/RequestApplication';
import WaitingRecipients from './pages/staff/WaitingRecipients';
import ExpiredBlood from './pages/organisation/ExpiredBlood';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const App = () => {
  const user=useSelector(state=>state.user.user);
  const staff=useSelector(state=>state.staff.staff);
  const organisation=useSelector(state=>state.organisation.organisation);
  // console.log("user",user,"staff",staff,"org",organisation)
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/users'>
            <Route path='signup' element={<User_signup/>}></Route>
            <Route index path='login' element={<UserLogin/>}></Route>
            <Route path='home' element={<UserHome/>}></Route>
          </Route>
          <Route path='/organisations'>
            <Route path='signup' element={<Organisation_signup/>}></Route>
            <Route index path='login' element={<OrganisationLogin/>}></Route>
            <Route path='home' element={<OrganisationHome/>}></Route>
          </Route>

          <Route path='/staffs'>
            <Route path='signup' element={<Staffs_signup/>}></Route>
            <Route index path='login' element={<StaffLogin/>}></Route>
            <Route path='home' element={<StaffHome/>}></Route>
          </Route>

          <Route path='/donor_registration/' element={<DonorRegistration/>}></Route>
          <Route path='/donor_registration/all' element={<DonorApplications/>}></Route>
          <Route path='/recipient_registration' element={<BloodRequest/>}/>
          <Route path='/blood_request/all' element={<RequestApplication/>}></Route>
          <Route path='/blood_donors/' element={<BloodDonors/>}></Route>
          <Route path='/waiting_recipients/' element={<WaitingRecipients/>}></Route>
          <Route path='/expired_blood/all' element={<ExpiredBlood/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App
