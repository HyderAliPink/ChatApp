import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

function useAuthListener() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("✅ User is logged in:", user.uid);
        setLoading(false);
      } else {
        // console.log("❌ User logged out");
        setLoading(false);
        setTimeout(() => navigate("/login"), 1000);
      }
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return { loading };
}

export default useAuthListener;
