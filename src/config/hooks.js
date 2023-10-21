import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });
  }, []);

  return user;
};
 

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); //  !! convert to boolean 
    });
  }, []);

  return isLoggedIn;
};
 