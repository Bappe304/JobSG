import { useState } from "react";  
import { Form } from "react-router-dom"; 
  
const Create = () => {  
  
    // States created for each job listing  
    const [jobTitle, setJobTitle] = useState('');  
    const [jobDescription, setJobDescription] = useState('');  
    const [totalPay, setTotalPay] = useState('');  
    const [startDateTime, setStartDateTime] = useState(new Date());  
    const [endDateTime, setEndDateTime] = useState(new Date());  
    const [postalCode, setPostalCode] = useState('');  
    const [reqNumberOfWorkers, setReqNumberOfWorkers] = useState(0);  
    const [numApplicants, setNumApplicants] = useState(0);  
    const [creatorName, setCreatorName] = useState('');  
    const [workerNames, setWorkerNames] = useState([]);  
    const [isPending, setIsPending] = useState(false); 
 
 
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        const creatorId = "6426a67cd214cdc2da12fd7f";
        const category = "education"
        const job = { jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers,creatorId}; 
        setIsPending(true); 
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2YTY3Y2QyMTRjZGMyZGExMmZkN2YiLCJpYXQiOjE2ODA5MzAyMzgsImV4cCI6MTY4MTE4OTQzOH0.fL-btj20bI7XsYK0jqVmzbpj_mNzuaQEdJbqinXjlFQ";
        fetch('http://localhost:4000/api/jobListings/createJobListing',{ 
            method: 'POST', 
            headers: {"Content-Type": "application/json"
        ,"Authorization": `Bearer ${token}`}, 
            body: JSON.stringify(job) 
        }).then((res) => { 
            console.log('New Job Listing added'); 
            setIsPending(false); 
            return res.json()
        }).then((data)=>{
            console.log("hi", data)
        }).catch(err=>{
            console.log(err.message)
        })
    } 
 
    return (   
        <div className="create"> 
            <h2>Add a New Job</h2> 
            <form onSubmit={handleSubmit}> 
                <label>Job title:</label> 
                <input  
                    type="text"  
                    required 
                    value = {jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                /> 
                <label>Job Description:</label> 
                <textarea 
                    required 
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)} 
                ></textarea> 
                <label>Total Pay:</label> 
                <input  
                    type="text"  
                    required 
                    value = {totalPay} 
                    onChange={(e) => setTotalPay(e.target.value)} 
                /> 
                <label>Enter starting date and time:</label> 
                <input 
                    type="datetime-local" 
                    name="startDateTime" 
                    value = {startDateTime} 
                    onChange={(e) => setStartDateTime(e.target.value)} 
                    required  
                /> 
                <label>Enter ending date and time:</label> 
                <input 
                    type="datetime-local" 
                    name="endDateTime" 
                    value = {endDateTime} 
                    onChange={(e) => setEndDateTime(e.target.value)} 
                    required  
                /> 
                <label>Location (Postal Code):</label> 
                <input  
                    type="text"  
                    required 
                    value = {postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)} 
                /> 
                <label>Required number of workers:</label> 
                <input  
                    type="number"  
                    required 
                    value = {reqNumberOfWorkers} 
                    onChange={(e) => setReqNumberOfWorkers(e.target.value)} 
                /> 
                <br></br> 
                <br></br> 
                <button className ="UploadJob"> 
                  Upload Job Image 
                  <input accept="image/*" type="file" id="img" name="img" required/> 
                </button> 
                <br></br> 
                <br></br> 
                { !isPending && <button className="AddJob">Add Job</button> } 
                { isPending && <button className="AddJob" disabled>Add Job Listing...</button> } 
            </form> 
        </div> 
    );  
}  
   
export default Create;