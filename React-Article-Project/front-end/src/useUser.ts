import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), function (user : any) {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  },[]);
  return { user, isLoading };
};

export default useUser;