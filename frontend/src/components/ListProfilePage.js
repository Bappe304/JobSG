import { format } from 'date-fns'

const ListProfilePage = ({ applications }) => {
    return ( 
        applications.jobsAppliedFor.map((jaf) => {
            <div className='pending-applications' key={jaf._id}>
                <label>Job ID:</label>
                <p>{ jaf.jobAppliedForID }</p>
                <label>Start Date & Time:</label>
                <p>{ jaf.startDateTime }</p>
                <label>End Date & Time:</label>
                <p>{ jaf.endDateTime }</p>
                <label>Application Status:</label>
                <p>{jaf.applicationStatus}</p>
            </div>
        })
     );
}
 
export default ListProfilePage;