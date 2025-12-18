import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  // sign in with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
  }


  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData)
  }

  // sign out user
  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  }

  // forget password
  const handleForgetPass = (email) => {
    return sendPasswordResetEmail(auth, email)

  }

  // user observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      setLoading(false);
    })

    return () => {
      unSubscribe()
    }
  }, [])


  const authInfo = {
    registerUser,
    signInUser,
    user,
    setUser,
    loading,
    setLoading, updateUser, logOut, handleForgetPass, signInWithGoogle
  }
  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;