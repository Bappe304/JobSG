import { useParams } from "react-router-dom"; 
import {Link} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
import ListProfilePage from "../components/ListProfilePage";
 
const ProfilePage = () => { 
    // To use the customisable route parameters
    const { _id } = useParams(); 
    console.log(_id)
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [jobs, setJobs] = useState(null);
    // const { data: profile, error, isLoading } = useFetch('http://localhost:4000/api/accounts/' + _id); 

    useEffect(() => {
        fetch('http://localhost:4000/api/accounts/' + _id,{ 
                method: 'POST',
                headers: {"Content-Type": "application/json",
                            "Authorization": `Bearer ${user.token}`},
                body: JSON.stringify({"applicantID": _id})
            }).then(response =>{
                return response.json()
            }
                ) 
            .then(data => {
                if(data["error"]) {
                    setIsLoading(false); 
                    throw Error(data["error"])
                }
                setIsLoading(false);
                setProfile(data); 
                // setJobs(profile.jobsAppliedFor)
                // console.log(data.getJSONArray('jobsAppliedFor'));
                // console.log(jobs)
            })   
            .catch((error)=>{
                console.log(error)
                setError(error.message)
            })
    }, [])

    return (  
        <div className="profile-details"> 
            { isLoading && <div>Loading...</div> } 
            { error && <div>{ error }</div> } 
            { profile && ( 

                
                <article> 
                    <h2 className="profile-title">Your Profile</h2> 
                    <img src={"../images/def-profile-pic.jpeg"} className="profile-image"></img> 
                    <br></br>
                    <label>Name</label>
                    <p>{ profile.firstName+" " + profile.lastName}</p> 
                    <label>Email: </label>
                    <p>{ profile.emailAddress }</p> 
                    <label>Age: </label>
                    <p>{ profile.age }</p> 
                    <label>Phone Number: </label>
                    <p>{ profile.phoneNumber }</p> 
                    <label>Gender: </label>
                    <p>{ profile.gender }</p>
                    {/* {profile && <ListProfilePage applications = {profile.jobsAppliedFor} />} */}
                    <br></br> 
                    <br></br> 
                </article> 
            )} 
        </div> 
     );
} 
  
export default ProfilePage;