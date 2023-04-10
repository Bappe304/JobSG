import { useState } from "react"; 
import { useSignup } from "../hooks/useSignup"; 
import '../index.css'; 
import { Link } from "react-router-dom"; 
 
const Signup = () => { 
    const [emailAddress, setEmailAddress] = useState(''); 
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [age, setAge] = useState(0); 
    const [gender, setGender] = useState('Male');
    const [profilePic, setProfilePic] = useState(null) 
    const {signup, error, isLoading} = useSignup() 
 
    const genderOptions = [ 'Male', 'Female' ]; 

    const onOptionChangeHandler = (event) => {  
        if (event.target.value == null) { 
            setGender("Male") 
        } else { 
            console.log(event.target.value) 
            setGender(event.target.value) 
        } 
    } 

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('emailAddress', emailAddress);
        setProfilePic(formData);
      };
 
    const handleSubmit = async (e) => { 
        e.preventDefault() 
 
        await signup(emailAddress, firstName, lastName, phoneNumber, password, age, gender, profilePic) 
    } 
 
    return (  
        <div className="signup-form"> 
            <h2>Sign Up to JobSG here!</h2> 
 
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
 
                <label>Age:</label> 
                <input 
                    type = "number" 
                    required 
                    value = { age } 
                    min = "16" 
                    max = "80" 
                    onChange = {(e) => setAge(e.target.value)} 
                /> 
                 
                <label>Email ID:</label> 
                <input 
                    type = "email" 
                    required 
                    value = { emailAddress } 
                    onChange = {(e) => setEmailAddress(e.target.value)} 
                /> 
 
                <label>Password:</label> 
                <input 
                    type = "text" 
                    required 
                    value = { password } 
                    onChange = {(e) => setPassword(e.target.value)} 
                /> 
 
                <label>Gender:</label> 
                <select name="gender" value={gender} onChange={onOptionChangeHandler} required> 
                    {genderOptions.map((option, index) => { 
                        return <option key = {index} > 
                            { option } 
                        </option> 
                    })} 
                </select> 
                <label>Profile Picture:</label>
                <input
                    type = "file"  
                    accept = "image/*"
                    name = "file"
                    onChange = {handleFileInputChange}
                />
                <br></br> 
                <br></br> 
                <button className="signup-button" disabled={isLoading}>Sign Up Now!</button> 
                <br></br> 
                <br></br> 
                <Link to = "/login" className="loginRedirect">Have an existing account? Login now!</Link> 
                {error && <div className="error">{error}</div>}  
            </form> 
        </div> 
     ); 
} 
  
export default Signup;