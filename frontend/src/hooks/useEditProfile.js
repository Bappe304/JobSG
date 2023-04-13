import { useState } from "react"; 
import { useAuthContext } from './useAuthContext' 

export const useEditProfile = () => {
    const [error, setError] = useState(null) 
    const [isLoading, setIsLoading] = useState(null) 
    const { dispatch, user } = useAuthContext()
    
    const editProfile = async (firstName, lastName, phoneNumber) => {
        setIsLoading(true) 
        setError(null)
        console.log(firstName, lastName, phoneNumber)
        const response = await fetch('http://localhost:4000/api/accounts/update/editAccountProfile', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.token}`}, 
            body: JSON.stringify({firstName, lastName, phoneNumber}) 
        }) 
        console.log(response)
        const json = await response.json() 
        console.log(json)
        if (!response.ok) { 
            setIsLoading(false) 
            setError(json.error) 
        } 
        if (response.ok) {  
            setIsLoading(false) 
        } 
    }

    return { editProfile, isLoading, error }
}