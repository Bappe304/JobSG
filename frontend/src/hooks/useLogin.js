import { useState } from "react"; 
import { useAuthContext } from './useAuthContext' 
 
export const useLogin = () => { 
    const [error, setError] = useState(null) 
    const [isLoading, setIsLoading] = useState(null) 
    const { dispatch } = useAuthContext() 
 
    const login = async (emailAddress, password) => { 
        setIsLoading(true) 
        setError(null) 
        const response = await fetch('http://localhost:4000/api/accounts/login', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({emailAddress, password}) 
        }) 
        console.log(response) 
        const json = await response.json() 
 
        if (!response.ok) { 
            setIsLoading(false) 
            setError(json.error) 
            return false
        } 
        if (response.ok) { 
            // Save user to localStorage 
            localStorage.setItem('user', JSON.stringify(json)) 
 
            // update auth context 
            dispatch({type: 'LOGIN', payload: json}) 
 
            setIsLoading(false) 
            return true
        } 
    } 
 
    return { login, isLoading, error }  
}