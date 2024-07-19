import { User } from 'lucide-react';
import {create} from 'zustand';
import {persist} from 'zustand/middleware'
type AuthDataProps = {
    token? : string;
    user? : User;
    setToken : (token : string) => void;
    setUser : (user : User) => void;
    logout : () => void;
}

type User  = {
    name : string;
    email : string;
    dateOfBirth : Date;
    image : string;
    address : string;
    role : string;
}


const useAuth = create<AuthDataProps>(
    (set) => ({
        token : localStorage.getItem("token") || "",
        user : JSON.parse(localStorage.getItem("gym-user") || '{}'),
        setToken : (token) => {
            console.log("sebuah token",token)
            set({token})
            localStorage.setItem('token', token)
        },
        setUser : (user : User) => {
            set({user})
            localStorage.setItem("gym-user", JSON.stringify(user))
        },
        logout : () => {
            set({user : undefined, token : undefined})
            localStorage.setItem('token', '')
        }
    })
)

export default useAuth;