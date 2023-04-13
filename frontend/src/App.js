import './index.css'; 
import NavBar from './components/NavBar'; 
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"; 
import Home from './pages/Home'; 
import JobListingDetails from './pages/JobListingDetails'; 
import JobApplicationForm from './pages/JobApplicationForm';
import Create from './pages/JobCreationForm'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext';
import Footer from './components/Footer'
import ProfilePage from './pages/ProfilePage'
import PendingApplicants from './pages/PendingApplicants';
import AppliedApplications from './pages/AppliedApplications';
import EditProfile from './pages/EditProfile';
import ListJobsByCategory from './components/ListJobsByCategory';
 

function App() { 
  const {user} = useAuthContext()
  return ( 
    <Router> 
      <div className="App"> 
        <NavBar /> 
 
        <div className='content'> 
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/category/:category' element={<ListJobsByCategory />} /> 
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} /> 
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} /> 
            <Route path='/create' element={user ? <Create /> : <Navigate to="/login" />} /> 
            <Route path='/joblistingdetails/:_id' element={<JobListingDetails />} /> 
            <Route path='/JobApplicationForm/:_id' element={user ? <JobApplicationForm /> : <Navigate to="/login" />}/>
            <Route path='/profilePage/:_id' element={user ? <ProfilePage/> : <Navigate to="/login" />} />
            <Route path='/PendingApplications' element={user ? <PendingApplicants /> : <Navigate to="/login" />} />
            <Route path='/appliedApplications' element={user ? <AppliedApplications/> : <Navigate to="/login" />} />
            <Route path='/editProfile/:_id' element={user ? <EditProfile /> : <Navigate to="/login" />} />
          </Routes> 
        </div> 
        <Footer/>
        
      </div> 
    </Router> 
  ); 
} 
 
export default App;