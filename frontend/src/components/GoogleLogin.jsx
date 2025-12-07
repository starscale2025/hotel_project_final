import { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const [user1, setUser] = useState(null);
  const [dispaly,setDisplay] = useState("block");

  // Google login button
const handleSuccess = async (credentialResponse) => {
  const token = credentialResponse.credential;
  const user = jwtDecode(token);

  // 1️⃣ Save to sessionStorage FIRST
  sessionStorage.setItem("googleToken", token);
  sessionStorage.setItem("userName", user.given_name);

  console.log("Stored userName:", sessionStorage.getItem("userName"));

  // 2️⃣ Send token to backend (wait until it finishes)
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  // 3️⃣ Reload AFTER everything is done
  setTimeout(() => {
    window.location.reload();
  }, 50);  // tiny delay makes sure sessionStorage is written before reload
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
