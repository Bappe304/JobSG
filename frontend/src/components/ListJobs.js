import { Link } from "react-router-dom";
import { format, utcToZonedTime } from 'date-fns-tz'

const ListJobs = ({ jobListings, title }) => {
    const timeZone = 'Singapore'
    return ( 
        <div className="list-jobs">
            <h2 className="all-jobs-title">{ title }</h2>
            {jobListings.map((jl) => (
                <div className="job-listing-preview" key = { jl._id }> 
                        
                        <p className="jobTitle">Job Title: { jl.jobTitle }</p>
                        <label>Job Description:</label>
                        <p>{ jl.jobDescription }</p>
                        <label>Total Pay: </label>
                        <p>${ jl.totalPay }</p>
                        <label>Start Date & Time:</label>
                        <p>{format(utcToZonedTime(new Date(jl.startDateTime), 'Singapore'), 'dd/MM/yyyy HH:mm', {timeZone: 'Singapore'})}</p>
                        <label>End Date & Time:</label>
                        <p>{format(utcToZonedTime(new Date(jl.endDateTime), 'Singapore'), 'dd/MM/yyyy HH:mm', {timeZone: 'Singapore'})}</p>
                        <Link to={`/joblistingdetails/${jl._id}`} className="job-listing-links">
                            <button>Find out more!</button>
                        </Link>
                </div>
            ))
            }
        </div>
     );
}
 
export default ListJobs;