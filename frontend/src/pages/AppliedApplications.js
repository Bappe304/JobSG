import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect } from 'react'
import ListAppliedApplications from '../components/ListAppliedApplications'

const AppliedApplications = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [appliedApplications, setAppliedApplications] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/application/getAllJobApplicationsForApplicant',{
                method: 'POST', 
                headers: {"Content-Type": "application/json",
                            "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({applicantID: user.accountID})
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
                setAppliedApplications(data); 
            })   
            .catch((error)=>{
                console.log(error)
                setError(error.message)
            })
    }, [])
        
        
        return ( 
            <div className='applied-apps'>
                { error && <div>{ error }</div>}
                { isLoading && <div>Loading...</div> }
    
                { appliedApplications && <ListAppliedApplications appliedApplications = {appliedApplications} title = "Jobs You've Applied For" />}
            </div>
        );
}
 
export default AppliedApplications;