import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenLoader from '../components/ScreenLoader';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { message } from 'antd';

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: { fullName: '', email: '', uid: '', role: '', details: {} } };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "setLoggedIn":
      return { ...state, isAuthenticated: true, user: { ...payload.user } };
    case "SET_PROFILE":
      return { ...state, user: { ...payload.user } };
    case "setLoggedOut":
      return initialState;
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, uid } = user;
        try {
          setIsProcessing(true);
          const userDoc = await getDoc(doc(firestore, 'users', uid));
          const userData = userDoc.exists() ? userDoc.data() : { fullName: '', role: '', details: {} };

          dispatch({
            type: "setLoggedIn",
            payload: {
              user: { fullName: userData.fullName, email, uid, role: userData.role, details: userData.details }
            }
          });
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      } else {
        dispatch({ type: "setLoggedOut" });
      }
      setIsScreenLoading(false);
      setIsProcessing(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [dispatch]);

  const login = async (email, password) => {
    setIsProcessing(true);
    setIsScreenLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : { fullName: '', role: '' };

      dispatch({
        type: "setLoggedIn",
        payload: {
          user: { fullName: userData.fullName, email, uid: user.uid, role: userData.role, details: userData.details }
        }
      });
      navigate('/');
      message.success("User  logged in successfully");
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/invalid-credential":
          message.error("Incorrect email and password");
          break;
        default:
          message.error("Something went wrong while logging in");
          break;
      }
    } finally {
      setIsProcessing(false);
      setIsScreenLoading(false);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      message.success('User  logged out');
      dispatch({ type: 'setLoggedOut' });
      navigate('/');
    }).catch((error) => {
      console.error(error.code);
      message.error('Something went wrong while logging out');
    });
  };

  const updateUser  = async (updatedUser ) => {
    const userId = state.user.uid;
    if (!userId) return;
    try {
      await updateDoc(doc(firestore, 'users', userId), {
        fullName: updatedUser.name,
      });

      dispatch ({
        type: "SET_PROFILE",
        payload: {
          user: { ...state.user, ...updatedUser }
        }
      });
      message.success("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      message.error("Failed to update user profile");
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout, user: state.user, isScreenLoading, setIsScreenLoading, isProcessing, setIsProcessing, updateUser }}>
      {isScreenLoading ? <ScreenLoader /> : children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);