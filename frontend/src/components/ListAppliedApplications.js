import { format, utcToZonedTime } from 'date-fns-tz'
import { Link } from 'react-router-dom'

const ListAppliedApplications = ({ appliedApplications, title }) => {
    return ( 
        <div>
            <h2 className='applied-app-title'>{ title }</h2>
            <div className='applied-applications'>
                {appliedApplications.map((aa) => (
                    <div className='applied-app-preview' key={aa._id}>
                        <label>Job ID:</label>
                        <p>{ aa.jobListingAppliedForID }</p>
                        <label>Start Date & Time:</label>
                        <p>{format(utcToZonedTime(new Date(aa.startDateTime), 'Singapore'), 'dd/MM/yyyy HH:mm', {timeZone: 'Singapore'})}</p>
                        <label>End Date & Time:</label>
                        <p>{format(utcToZonedTime(new Date(aa.endDateTime), 'Singapore'), 'dd/MM/yyyy HH:mm', {timeZone: 'Singapore'})}</p>
                        <label>Application Status:</label>
                        <p>{aa.applicationStatus}</p>
                        <Link to={`/jobListingDetails/${aa.jobListingAppliedForID}`}>
                            <button>View Job</button>
                        </Link>
                    </div>
                ))
                }
            </div>
        </div>
     );
}
 
export default ListAppliedApplications;