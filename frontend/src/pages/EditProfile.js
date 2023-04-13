import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEditProfile } from "../hooks/useEditProfile"; 
import { useAuthContext } from "../hooks/useAuthContext";

const EditProfile = () => {
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState('');
    const { editProfile, error, isLoading } = useEditProfile();
    const { user } = useAuthContext();
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => { 
        e.preventDefault() 
        console.log("hello world")
        const res = await editProfile(firstName, lastName, phoneNumber)
        navigate(`/profilePage/${user.accountID}`)
    }
    
    return ( 
        <div className="signup-form"> 
            <h2>Edit your profile here!</h2> 
 
            <form onSubmit={handleSubmit}> 
                <label>First Name:</label> 
                <input 
                    type = "text" 
                    required 
                    value = { firstName } 
                    onChange = {(e) => setFirstName(e.target.value)} 
                /> 
 
                <label>Last Name:</label> 
                <input 
                    type = "text" 
                    required 
                    value = { lastName } 
                    onChange = {(e) => setLastName(e.target.value)} 
                /> 
 
                <label>Phone Number:</label> 
                <input 
                    type = "tel" 
                    required 
                    value = { phoneNumber } 
                    width = {8} 
                    placeholder = "91234567" 
                    //pattern = "[6,8,9]{1}[0-9]{7}" 
                    onChange = {(e) => setPhoneNumber(e.target.value)} 
                />
                <br></br>
                <br></br>
                { user && 
                <button className="signup-button" disabled={isLoading}>Update Profile</button> }
                {error && <div className="error">{error}</div>}  
            </form> 
        </div>
     );
}
 
export default EditProfile;