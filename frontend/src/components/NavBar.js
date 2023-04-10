import { Link } from "react-router-dom" 
import { useLogout } from "../hooks/useLogout"; 
import { useAuthContext } from "../hooks/useAuthContext"; 

const NavBar = () => { 
    const { logout } = useLogout() 
    const { user } = useAuthContext() 
 
    const handleClick = () => { 
        logout() 
    } 
 
    return (  
        // Navbar component 
        <nav className = "navBar"> 
            {/* Clickable brand name and logo to go to homepage */} 
            <Link to="/" className="brand"> 
                <img src={"../images/logo.png"}></img> 
                <h1 className="brandName">JobSG</h1> 
            </Link> 
 
            {/* Navbar when user is logged in */} 
            {user && ( 
                <div className="logged-in-links"> 
                    <Link to={`/profilePage/${user.accountID}`}>
                        <p className="profile-page-link">Welcome, {user.emailAddress}</p>
                    </Link>
                    <Link to="/appliedApplications">Applied Applications</Link>  
                    <Link to="/PendingApplications">Pending Applicants</Link> 
                    <Link to="/create">Create Job</Link> 
                    <button onClick={handleClick} className="logout-button">Logout</button> 
                </div> 
            )} 
            {/* Navbar when user is NOT logged in */} 
            {!user && ( 
                <div className="links"> 
                    <Link to="/login" className="profile"> 
                        <img src={"../images/account_circle.png"}></img> 
                    </Link> 
                </div> 
            )} 
        </nav> 
     ); 
} 
  
export default NavBar;