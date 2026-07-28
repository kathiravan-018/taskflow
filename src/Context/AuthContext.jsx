import { createContext, useState, useEffect } from "react";
import API from "../api/axios";


export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function fetchProfile(){

            const token = localStorage.getItem("access");

            if(!token){
                return;
            }

            try{

                const response = await API.get("profile/");

                setUser(response.data);

                setIsLoggedIn(true);

            }catch(error){

                setUser(null);

                setIsLoggedIn(false);

            }

        }

        fetchProfile();

    }, []);
    

    return(
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;