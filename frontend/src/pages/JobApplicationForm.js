import { useNavigate } from "react-router-dom"  
import React, { useState } from 'react';  
import DatePicker from 'react-date-picker'; 
import { useAuthContext } from "../hooks/useAuthContext";
  
  
const JobApplicationForm = () => {  
    const [startDate, setStartDate] = useState(new Date());  
    const [endDate, setEndDate] = useState(new Date());  
    const [loading, setLoading] = useState(false); // add a state for loading  
    const [resumeUploaded, setResumeUploaded] = useState(false); // add a state to track if the user has uploaded their resume  
    const [noResumeError, setNoResumeError] = useState(null); // add a state for error messages  
    const [endDateError, setEndDateError] = useState(null); // add a state for end date error messages 
    const { user } = useAuthContext()

 
    const today = new Date(); // get today's date  
    const tomorrow = new Date(); // create a new date object for tomorrow  
    tomorrow.setDate(today.getDate() + 1); // set the date to tomorrow's date 
    console.log(today) 
    console.log(tomorrow) 
  
    // handle submit function  
    const handleSubmit = async (e) => {  
        e.preventDefault(); // prevent default form submission  
        setLoading(true); // set loading state to true  
  
        // const resumeInput = document.getElementById('pdf');  
        // const resumeFile = resumeInput.files[0];  
        //const diffInDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000); //formula in seconds, convert to day  
        // const userID = getAccountByID(id);  
        // const jobID = jobInfoController(handleGetJobListingByID);  
  
  
        //check if both wrong then send both error messages  
        // if (!resumeFile && diffInDays < 1) {  
        //     setNoResumeError("Please upload your resume.");  
        //     setEndDateError("End date must be at least one day later than start date.");  
        //     setLoading(false);  
        //     return;  
        // }  
  
        // // check if resume is uploaded  
        // if (!resumeFile) {  
        //     setNoResumeError('Please upload your resume.');  
        //     setLoading(false); // set loading state to false  
        //     return;  
        // }  
  
        //check if end date is at least one day later than start date  
        /*
        if (diffInDays < 1) {  
            setEndDateError('End date must be at least one day later than start date.');  
            setLoading(false); // set loading state to false  
            return;  
        }  
        */
  
        // handle form submission logic here  
        const application = {startDate, endDate, loading};  
        //see on console  
        console.log(application);  
        
        // const formData = {startDate, endDate, resumeFile};  
        const formData = {startDate, endDate, accountID: user.accountID}; 
        console.log(formData)
  
        try {  
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2YTY3Y2QyMTRjZGMyZGExMmZkN2YiLCJpYXQiOjE2ODA5MzAyMzgsImV4cCI6MTY4MTE4OTQzOH0.fL-btj20bI7XsYK0jqVmzbpj_mNzuaQEdJbqinXjlFQ";
            const response = await fetch('http://localhost:4000/api/application/createJobApplication/' , {  
                method: 'POST',
                headers: {"Content-Type": "application/json"
        ,"Authorization": `Bearer ${token}`},   
                body: formData  
            }).then(res=> {console.log(res); return res.json()}) 
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
            <h3 className="section">Job Application Form: Please input the necessary details as required below.</h3>  
            <br></br> 
            <h3 className="section">Intended Working Period:</h3>  
            <h4>Start Date: </h4>  
            <input 
                type="datetime-local" 
                id = "startDate" 
                value = {startDate}  
                onChange={(e) =>setStartDate(e.target.value)}  
                min = {today} //set minDate to today 
                required  
            />  
            <br></br>  
            <br></br>  
            <h4>End Date:</h4>  
            <input 
                type="datetime-local"  
                id = "endDate" 
                value = {endDate}  
                onChange={(e) => setEndDate(e.target.value)}  
                min = {tomorrow} //set minDate to tomorrow  
                required  
            />  
            {endDateError && <p style={{color: 'red'}}>{endDateError}</p>}  
            <br></br>  
            <br></br>  
            {/* <h3 className="section">Relevant Documents:</h3>  
            <h4 className="section">Please upload the following documents (in pdf form):</h4>  
            <input 
                type="file" 
                id="file" 
            > 
            </input> 
  
        <br></br> 
        <br></br> */} 
 
        <button onClick={handleSubmit} className="submitButton">Submit</button> 
        </div>  
 
    );  
};  
  
export default JobApplicationForm;