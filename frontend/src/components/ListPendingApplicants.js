import { format, utcToZonedTime } from 'date-fns-tz'
import { Link } from 'react-router-dom'

const ListPendingApplicants = ({ pendingApplicants, title }) => {
    return ( 
        <div>
            <h2 className='pending-app-title'>{ title }</h2>
            <div className='pending-applications'>
                {pendingApplicants.map((pa) => (
                    <div className='pending-app-preview' key={pa._id}>
                        <label>Applicant ID:</label>
                        <p>{ pa.applicantID }</p>
                        <label>Start Date & Time:</label>
                        <p>{format(utcToZonedTime(new Date(pa.startDateTime), 'Singapore'), 'dd/MM/yyyy HH:mm', {timeZone: 'Singapore'})}</p>
                        <label>End Date & Time:</label>
                        <p>{format(utcToZonedTime(new Date(pa.endDateTime), 'Singapore'), 'dd/MM/yyyy HH:mm', {timeZone: 'Singapore'})}</p>
                        <label>Application Status:</label>
                        <p>{pa.applicationStatus}</p>
                        <Link to={`/profilePage/${pa.applicantID}`}>
                            <button>View Applicant</button>
                        </Link>
                    </div>
                ))
                }
            </div>
        </div>
     );
}
 
export default ListPendingApplicants;