import { useParams } from "react-router-dom"; 
import useFetch from "./useFetch"; 
import {Link} from "react-router-dom";
 
const JobListingDetails = () => { 
    // To use the customisable route parameters
    const { _id } = useParams(); 
    console.log(_id)
    const { data: jobListing, error, isLoading } = useFetch('http://localhost:4000/api/jobListings/getJobInformation/' + _id); 
    
    return (  
        <div className="job-listing-details"> 
            { isLoading && <div>Loading...</div> } 
            { error && <div>{ error }</div> } 
            { jobListing && ( 
                <article> 
                    <h2 className="job-listing-title">{ jobListing.jobTitle }</h2> 
                    <p>Job Description: { jobListing.jobDescription }</p> 
                    <p>Total Pay: { jobListing.totalPay }</p> 
                    <p>Start Date & Time: { jobListing.startDateTime }</p> 
                    <p>End Date & Time: { jobListing.endDateTime }</p> 
                    <p>Job location: { jobListing.postalCode }</p> 
                    <p>Number of Workers needed: { jobListing.reqNumberOfWorkers }</p> 
                    <p>Job posted by: { jobListing.creatorName }</p> 
                    <br></br> 
                    <br></br> 
                    <Link to={`/jobApplicationForm/${_id}`} className="job-application-links"> 
                    <button>Apply Now!</button> 
                    </Link> 
                </article> 
            )} 
        </div> 
     );
} 
  
export default JobListingDetails;