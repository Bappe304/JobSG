import { useParams } from "react-router-dom"; 
import useFetch from "../hooks/useFetch"; 
import {Link} from "react-router-dom";
 
const ProfilePage = () => { 
    // To use the customisable route parameters
    const { _id } = useParams(); 
    console.log(_id)
    const { data: profile, error, isLoading } = useFetch('http://localhost:4000/api/accounts/' + _id); 
    
    return (  
        <div className="job-listing-details"> 
            { isLoading && <div>Loading...</div> } 
            { error && <div>{ error }</div> } 
            { profile && ( 

                
                <article> 
                    <h2 className="profile-title">Your Profile</h2> 
                    <img src={`${profile.imageLink}`} className="profile-image"></img> 
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
                    <br></br> 
                    <br></br> 
                </article> 
            )} 
        </div> 
     );
} 
  
export default ProfilePage;