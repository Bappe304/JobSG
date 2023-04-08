import { useNavigate } from "react-router-dom" 
import React, { useState } from 'react'; 
import DatePicker from 'react-date-picker'; 
//import { Button, Grid } from "@mui/material/"; 
// import { databaseController } from "./databaseController"; 
// import { jobInfoController } from "./jobInfoController"; 
 
 
const JobApplicationForm = () => { 
    const today = new Date(); // get today's date 
    const tomorrow = new Date(today); // create a new date object for tomorrow 
    tomorrow.setDate(today.getDate() + 1); // set the date to tomorrow's date 
     
    const [startDate, setStartDate] = useState(today); 
    const [endDate, setEndDate] = useState(tomorrow); 
    const [loading, setLoading] = useState(false); // add a state for loading 
    const [resumeUploaded, setResumeUploaded] = useState(false); // add a state to track if the user has uploaded their resume 
    const [noResumeError, setNoResumeError] = useState(null); // add a state for error messages 
    const [endDateError, setEndDateError] = useState(null); // add a state for end date error messages 
 
    // handle submit function 
    const handleSubmit = async (e) => { 
        e.preventDefault(); // prevent default form submission 
        setLoading(true); // set loading state to true 
 
        const resumeInput = document.getElementById('pdf'); 
        const resumeFile = resumeInput.files[0]; 
        const diffInDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000); //formula in seconds, convert to day 
        // const userID = getAccountByID(id); 
        // const jobID = jobInfoController(handleGetJobListingByID); 
 
 
        //check if both wrong then send both error messages 
        if (!resumeFile && diffInDays < 1) { 
            setNoResumeError("Please upload your resume."); 
            setEndDateError("End date must be at least one day later than start date."); 
            setLoading(false); 
            return; 
          } 
 
        // check if resume is uploaded 
        if (!resumeFile) { 
            setNoResumeError('Please upload your resume.'); 
            setLoading(false); // set loading state to false 
            return; 
        } 
 
        //check if end date is at least one day later than start date 
        if (diffInDays < 1) { 
            setEndDateError('End date must be at least one day later than start date.'); 
            setLoading(false); // set loading state to false 
            return; 
        } 
 
        // handle form submission logic here 
        const application = {startDate, endDate, loading}; 
        //see on console 
        console.log(application); 
 
        //const formData = new FormData(); 
        // formData.append('applicantID', applicantID); 
        // formData.append('jobListingAppliedForID', jobListingAppliedForID); 
        //formData.append('startDate', startDate); 
        //formData.append('endDate', endDate); 
        //formData.append('relevantDocuments', resumeFile); 
        const formData = {startDate, endDate, resumeFile}; 
 
        try { 
            const response = await fetch('http://localhost:4000/api/application/createJobApplication', { 
                method: 'POST', 
                body: formData 
            }).then(res=> res.json())
            .then(data=>console.log(data))
            .catch(err=> console.log(err.message))
 
            const data = await response.json(); 
 
            setLoading(false); 
 
            //navigate('/success'); // redirect to success page on successful submission 
        } catch (error) { 
            console.error(error); 
            setLoading(false); 
        } 
 
        setLoading(false); // set loading state to false 
        setNoResumeError(null); // reset resume error message state 
        setEndDateError(null); // reset end date error message state 
    } 
 
    return (  
        //let applicant choose start and end date for working duration 
        <div> 
            <h3>Job Application Form: Please input the necessary details as required below.</h3> 
            <h3>Intended Working Period:</h3> 
            <h4>Start Date: </h4> 
            <DatePicker 
                value={startDate} 
                onChange={date => setStartDate(date)} 
                minDate={today} //set minDate to today
                required 
            /> 
            <br></br> 
            <br></br> 
            <h4>End Date:</h4> 
            <DatePicker 
                value={endDate} 
                onChange={date => setEndDate(date)} 
                // minDate={startDate} 
                minDate={today} //set minDate to tomorrow 
                required 
            /> 
            {endDateError && <p style={{color: 'red'}}>{endDateError}</p>} 
            <br></br> 
            <br></br> 
            <h3>Relevant Documents:</h3> 
            <h4>Please upload the following documents (in pdf form):</h4> 
            <p>- Resume</p> 
 
            {/* applicants upload resume and submit */} 
            {/*<Grid container> 
                <Grid item xs={10}> 
                    <Button variant="outlined" component="label"> 
                        Upload Your Resume Here 
                        <input accept=".pdf/*" type="file" id="pdf" name="pdf" required onChange={() => setResumeUploaded(true)}/> 
                    </Button> 
                </Grid> 
            </Grid> 
            {noResumeError && <p style={{color: 'red'}}>{noResumeError}</p>} 
            <br></br> 
            
    */}
        <button onClick={handleSubmit} className="Submit">Submit</button>
        </div> 

    ); 
}; 
 
export default JobApplicationForm;