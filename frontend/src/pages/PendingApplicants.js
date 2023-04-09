import useFetch from '../hooks/useFetch'
import { useAuthContext } from '../hooks/useAuthContext';
import ListPendingApplicants from '../components/ListPendingApplicants';
import { useState, useEffect } from 'react'

const PendingApplicants = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [pendingApplications, setPendingApplications] = useState(null);

useEffect(() => {
    fetch('http://localhost:4000/api/application/getAllJobApplications',{ 
            headers: {"Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`} 
        }).then(response =>{

            console.log(response)
            return response.json()
        }
            ) 
        .then(data => {
            console.log(data);
            if(data["error"]) {
                setIsLoading(false); 
                throw Error(data["error"])
            }
            setIsLoading(false);
            setPendingApplications(data); 
        })   
        .catch((error)=>{
            console.log(error)
            setError(error.message)
        })
}, [])
    
    
    return ( 
        <div className='pending-applicants'>
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div> }

            { pendingApplications && <ListPendingApplicants pendingApplicants = {pendingApplications} title = "Pending Applications" />}
        </div>
    );
}
 
export default PendingApplicants;