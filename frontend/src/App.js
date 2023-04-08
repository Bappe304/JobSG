import './acceptRejectAppForm.css'
import './chat.css'
import './index.css'; 
import NavBar from './NavBar'; 
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Home from './Home'; 
import JobListingDetails from './JobListingDetails'; 
import JobApplicationForm from './JobApplicationForm';
import Create from './Create'
import ChatWindow from './ChatWindow'
 
function App() { 
  return ( 
    <Router> 
      <div className="App"> 
        <NavBar /> 
 
        <div className='content'> 
          <Routes> 
            <Route path='/' element={<Home />} /> 
            <Route path='/create' element={<Create />} />
            <Route path='/joblistingdetails/:_id' element={<JobListingDetails />} /> 
            <Route path='/JobApplicationForm/:_id' element={<JobApplicationForm/>}/>
            <Route path='/ChatWindow' element={<ChatWindow/>} />
          </Routes> 
        </div> 
 
        
      </div> 
    </Router> 
  ); 
} 
 
export default App;