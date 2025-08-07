import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import auth from '../firebase/firebase.init';
import { Result } from 'postcss';



const AuthProvide = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(false);

    

    const createUser = (email,password,profile) => {
        setLoading(true);
        
        return createUserWithEmailAndPassword(auth,email,password).then(
            result =>{
                return updateProfile(result.user,profile)
            }
        );
    }

    const signInUser = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const createUserByGoogle =()=>{
        setLoading(true);
        const Provider = new GoogleAuthProvider();
        return signInWithPopup(auth,Provider);
    }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,(user)=>{
            setUser(user);
            console.log(user);
            setLoading(false);
        })
        return ()=>unSubscribe();
    },[])
    const variables = {
        user,
        loading,
        createUser,
        createUserByGoogle,
        signInUser,
        signOutUser,
        theme,
        setTheme
    };
    return (
        <AuthContext.Provider  value={variables}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvide;