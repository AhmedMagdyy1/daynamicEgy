import { createContext, useState } from "react";

export let userContext = createContext({})

export default function UserContextProvider({children}){
    const emailAuth = 'beshoy@gmail.com';
    const password = 'D@123456';
    const credentials = btoa(`${emailAuth}:${password}`);
    const authHeader = `Basic ${credentials}`;

    // Initialize the token state with null (no token initially)
    const [token, setToken] = useState(null)
    // const [userInfo,setUserInfo]=useState(null)

    // Return the user context provider with token and authentication header
    return <userContext.Provider value={{token, setToken,authHeader}}>
        {children}
    </userContext.Provider>
}