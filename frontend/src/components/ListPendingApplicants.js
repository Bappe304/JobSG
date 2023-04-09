import { format } from 'date-fns'

const ListPendingApplicants = ({ pendingApplicants, title }) => {
    return ( 
        <div className='pending-applications'>
            <h2 className='pending-app-title'>{ title }</h2>
            {pendingApplicants.map((pa) => (
                <div className='pending-app-preview' key={pa._id}>
                    <label>Applicant ID:</label>
                    <p>{ pa.applicantID }</p>
                    <label>Start Date & Time:</label>
                    <p>{ pa.startDateTime }</p>
                    <label>End Date & Time:</label>
                    <p>{ pa.endDateTime }</p>
                    <label>Application Status:</label>
                    <p>{pa.applicationStatus}</p>
                </div>
            ))
            }
        </div>
     );
}
 
export default ListPendingApplicants;