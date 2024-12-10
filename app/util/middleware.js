import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../context/userContext";

const redirectIfLoggedIn = (Component) => {
  return (props) => {
    const router = useRouter();
    const { user } = useContext(UserContext);

    useEffect(() => {
      if (user) {
        router.push("/");
      }
    }, [user, router]);

    return !user ? <Component {...props} /> : null;
  };
};

export default redirectIfLoggedIn;
