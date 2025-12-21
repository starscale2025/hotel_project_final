import { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const [user1, setUser] = useState(null);
  const [dispaly,setDisplay] = useState("block");

  // Google login button
const handleSuccess = async (credentialResponse) => {
  try {
    const credential = credentialResponse.credential;
    const user = jwtDecode(credential);

    sessionStorage.setItem("googleToken", credential);
    sessionStorage.setItem("userName", user.given_name);

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      }
    );

    if (!res.ok) throw new Error("Backend auth failed");

    // ✅ trigger UI update instead of reload
    setUser(user);

  } catch (e) {
    console.error("Login flow failed:", e);
  }
};



  
  const handleError = () => {
    console.error('Login Failed')
  }

  return (
  <>
  {sessionStorage.getItem('googleToken')
  ?
    <h1 className=" lg:block text-luxury-ivory/80 hover:text-luxury-gold transition-colors duration-300 text-sm tracking-[0.2em] uppercase font-medium">{sessionStorage.getItem("userName")}</h1>
  :
    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
  }
  </>
)
}  

export default Login;
