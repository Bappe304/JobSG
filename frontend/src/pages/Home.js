import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ListJobs from "../components/ListJobs";
import ListJobsByCategory from "../components/ListJobsByCategory";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const { data: shortJobListings, isLoading, error } = useFetch('http://localhost:4000/api/jobListings/displayAllJobs');

    
    return ( 
        <div className="home">
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div> }

            { shortJobListings && <ListJobs jobListings = { shortJobListings } title = "All Jobs"/> }
        </div>
     );
}
 
export default Home;
