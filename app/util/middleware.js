"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const redirectIfLoggedIn = (Component) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/user`, {
            credentials: "include",
          });
          const data = await response.json();
          if (data.success) {
            router.push('/');
          }else{
            setLoading(false); 
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };
  
      fetchUser();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default redirectIfLoggedIn;
