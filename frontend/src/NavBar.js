import { Link } from "react-router-dom"

const NavBar = () => {
    return ( 
        // Navbar component
        <nav className = "navBar">
            {/* Clickable brand name and logo to go to homepage */}
            <Link to="/" className="brand">
                <img src={"../images/logo.png"}></img>
                <h1 className="brandName">JobSG</h1>
            </Link>

            {/* Other clickable links */}
            <div className="links">
                <Link to="/" className="searchJob">Search Job</Link>
                <Link to="/login" className="profile">
                    <img src={"./images/account_circle.png"}></img>
                </Link>
            </div>
        </nav>
     );
}
 
export default NavBar;