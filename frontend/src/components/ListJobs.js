import { Link } from "react-router-dom";

const ListJobs = ({ jobListings, title }) => {
    return ( 
        <div className="list-jobs">
            <h2 className="all-jobs-title">{ title }</h2>
            {jobListings.map((jl) => (
                <div className="job-listing-preview" key = { jl._id }> 
                        <img className = "job-image" src={`${jl.imageLink}`}></img>
                        <p className="jobTitle">Job Title: { jl.jobTitle }</p>
                        <label>Job Description:</label>
                        <p>{ jl.jobDescription }</p>
                        <label>Total Pay:</label>
                        <p>{ jl.totalPay }</p>
                        <label>Start Date & Time:</label>
                        <p>{ jl.startDateTime }</p>
                        <label>End Date & Time:</label>
                        <p>{ jl.endDateTime }</p>
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