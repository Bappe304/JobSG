import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
 
//display a list of applications with their applicant's names and calls the onApplicationSelect function when an application is clicked 
function ApplicantList({ applications, onApplicationSelect }) { 
    return ( 
        <div> 
            <h2>Current Applicants</h2> 
            <ul> 
                {applications.map((application) => ( 
                    <li key={application.id} onClick={() => onApplicationSelect(application)}> 
                        {application.name} (ID: {application.applicantID})  
                    </li> 
                ))} 
            </ul> 
        </div> 
    ); 
} 
 
//must be able to show applicants' details as per Model 
 
function AcceptRejectAppForm() { 
    const [selectedApplication, setSelectedApplication] = useState(null); 
    const [showOptions, setShowOptions] = useState(false); 
    const navigate = useNavigate(); 
    // const [applications, setApplications] = useState([]); 
 
    const handleApplicationSelect = (application) => { 
        setSelectedApplication(application); 
        setShowOptions(true); 
    }; 
 
    const getAppsByJobID = (jobID) => { 
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2YTY3Y2QyMTRjZGMyZGExMmZkN2YiLCJpYXQiOjE2ODA5MzAyMzgsImV4cCI6MTY4MTE4OTQzOH0.fL-btj20bI7XsYK0jqVmzbpj_mNzuaQEdJbqinXjlFQ"; 
        const payload = {jobID} 
        const response = fetch('http://localhost:4000/api/applications/getApplications/' + jobID, {  
            headers: {"Content-Type": "application/json",  
        "Authorization": `Bearer ${token}`}, 
        body: JSON.stringify(payload) 
        }).then((res)=> { 
            return res.json() 
        }) 
        .then((data)=>{ 
            console.log(data) 
        }).catch((err)=>{ 
            console.log(err.message) 
        }) 
    } 
 
    const handleAccept = () => { 
        // implement accepting the application in backend 
        setSelectedApplication(null); 
        setShowOptions(false); 
        navigate('/jobListings'); 
    }; 
 
    const handleReject = () => { 
        // implement rejecting the application in backend 
        setSelectedApplication(null); 
        setShowOptions(false); 
        navigate('/jobListings'); 
    }; 
 
    //"stand-in" array of applications  
    const applications = [ 
        { id: 1, name: 'Applicant 1', details: 'Application details 1' }, 
        { id: 2, name: 'Applicant 2', details: 'Application details 2' }, 
        { id: 3, name: 'Applicant 3', details: 'Application details 3' }, 
    ]; 
 
    return ( 
        <div> 
        <h1>Job Applications</h1> 
        {/* to show the list of applications and selected application's details side-by-side */} 
        <div style={{ display: 'flex' }} className="appdetails"> 
            <ApplicantList applications={applications} onApplicationSelect={handleApplicationSelect} /> 
                {selectedApplication && ( 
                <div className="details"> 
                    <h2>Application Details</h2> 
                    <p>Applicant ID: {selectedApplication.applicantID}</p> 
                    <br></br> 
                    <p>Start Date: {selectedApplication.startDate}</p> 
                    <br></br> 
                    <p>End Date: {selectedApplication.endDate}</p> 
                    <br></br> 
                    {/* <p>{selectedApplication.details}</p> */} 
                    <button onClick={handleAccept} className="acceptButton">Accept Application</button> 
                    <button onClick={handleReject} className="rejectButton">Reject Application</button> 
                </div> 
                )} 
        </div> 
        </div> 
    ); 
} 
 
export default AcceptRejectAppForm;