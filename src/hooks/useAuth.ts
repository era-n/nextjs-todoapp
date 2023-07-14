import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase-client";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  });

  return { user, isLoggedIn };
};
export default useAuth;
