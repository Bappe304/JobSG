import { useState } from "react"; 
import { useAuthContext } from './useAuthContext' 
 
export const useSignup = () => { 
    const [error, setError] = useState(null) 
    const [isLoading, setIsLoading] = useState(null) 
    const { dispatch } = useAuthContext() 
 
    const signup = async (emailAddress, firstName, lastName, phoneNumber, password, age, gender, profilePic) => { 
        setIsLoading(true) 
        setError(null) 
        let obj = {emailAddress, firstName, lastName, password, phoneNumber, age, gender} 
        console.log(obj) 
        const response = await fetch('http://localhost:4000/api/accounts/signup', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({emailAddress, firstName, lastName, password, phoneNumber, age, gender}) 
        }) 
        const json = await response.json() 
        
        if (!response.ok) { 
            setIsLoading(false) 
            setError(json.error) 
        } 
        if (response.ok) { 
            // Save user to localStorage 
            localStorage.setItem('user', JSON.stringify(json)) 
 
            // update auth context 
            dispatch({type: 'LOGIN', payload: json}) 
 
            setIsLoading(false) 
        } 
        const response2 = await fetch(`http://localhost:4000/api/uploadPP/uploadPP?email=${encodeURIComponent(emailAddress)}`, {
            method: 'POST',
            body: profilePic
        })
        const json2 = await response2
        
        if (!response2.ok) {
            setIsLoading(false)
            setError(json2.error)
        }
        if (response2.ok) {
            setIsLoading(false)
        }
    } 
 
    return { signup, isLoading, error }  
}


