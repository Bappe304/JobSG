import './acceptRejectAppForm.css'
import './index.css'; 
import NavBar from './components/NavBar'; 
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"; 
import Home from './pages/Home'; 
import JobListingDetails from './components/JobListingDetails'; 
import JobApplicationForm from './pages/JobApplicationForm';
import Create from './components/Create'
import ChatWindow from './pages/ChatWindow'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext';
import Footer from './components/Footer'
import ProfilePage from './pages/ProfilePage'
import AcceptRejectAppForm from './pages/AcceptRejectAppForm';
import PendingApplicants from './pages/PendingApplicants';
 

function App() { 
  const {user} = useAuthContext()
  return ( 
    <Router> 
      <div className="App"> 
        <NavBar /> 
 
        <div className='content'> 
          <Routes> 
            <Route path='/' element={<Home />} /> 
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} /> 
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} /> 
            <Route path='/create' element={user ? <Create /> : <Navigate to="/login" />} /> 
            <Route path='/joblistingdetails/:_id' element={<JobListingDetails />} /> 
            <Route path='/JobApplicationForm/:_id' element={user ? <JobApplicationForm /> : <Navigate to="/login" />}/>
            <Route path='/ChatWindow' element={user ? <ChatWindow/>: <Navigate to="/login" />} />
            <Route path='/profilePage/:_id' element={user ? <ProfilePage/> : <Navigate to="/login" />} />
            <Route path='/PendingApplications' element={user ? <PendingApplicants /> : <Navigate to="/login" />} />
          </Routes> 
        </div> 
        <Footer/>
        
      </div> 
    </Router> 
  ); 
} 
 
export default App;