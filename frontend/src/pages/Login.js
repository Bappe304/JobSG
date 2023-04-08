import { useState } from "react"; 
import { useLogin } from "../hooks/useLogin"; 
import { Link, Navigate ,useNavigate} from "react-router-dom"; 

 
const Login = () => { 
    const [emailAddress, setEmailAddress] = useState(''); 
    const [password, setPassword] = useState(''); 
    const { login, error, isLoading } = useLogin() 
    const navigate = useNavigate();
 
    const handleSubmit = async (e) => { 
        e.preventDefault() 
 
        const loginSuccess = await login(emailAddress, password) 

        if (loginSuccess){
            navigate('/')
        }

    } 
 
    return (  
        <div className="login-page"> 
            <h2>Login Page</h2> 
 
            <form onSubmit={handleSubmit}> 
                <label>Email ID:</label> 
                <input 
                    type = "email" 
                    required 
                    value = {emailAddress} 
                    onChange = {(e) => setEmailAddress(e.target.value)} 
                /> 
 
                <label>Password:</label> 
                <input 
                    type = "password" 
                    required 
                    value = { password } 
                    onChange = {(e) => setPassword(e.target.value)} 
                /> 
                <br></br> 
                <br></br> 
                <button className="loginButton" disabled={isLoading}>Login</button> 
                <br></br> 
                <br></br> 
                <Link to="/signup" className="signUpRedirect">Don't have an account yet? Signup now!</Link> 
                {error && <div className="error">{error}</div>} 
            </form> 
        </div> 
     ); 
} 
  
export default Login;