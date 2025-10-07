import { useState } from "react";
import { auth } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "./Hooks/useToast";
import { ScaleLoader } from "react-spinners";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast()
const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
    await signInWithEmailAndPassword(auth, email, password);
    showSuccess("Sign in successful!");
    setLoading(true)

    // Navigate safely after state updates
    setTimeout(() => {
      navigate("/chatroom");
      setLoading(false);
    }, 500);

  } catch (err) {
    setLoading(false);
    showError("Invalid email or password. Please try again.");
  }
  };

  return (
    <>
    {loading ? ( <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
        <ScaleLoader color="#3b82f6" />
      </div>) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
  <form
    onSubmit={handleLogin}
    className="flex flex-col gap-3 bg-white p-8 w-full max-w-md rounded-2xl font-sans shadow-lg"
  >
    <h2 className="text-2xl font-bold text-center text-[#151717] mb-2">
      Welcome Back
    </h2>


    <div className="flex flex-col">
      <label className="text-[#151717] font-semibold">Email</label>
      <div className="flex items-center h-12 px-3 border border-[#ecedec] rounded-xl transition duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="ml-1 border-none w-full h-full focus:outline-none rounded-xl placeholder:font-sans"
        />
      </div>
    </div>

    <div className="flex flex-col">
      <label className="text-[#151717] font-semibold">Password</label>
      <div className="flex items-center h-12 px-3 border border-[#ecedec] rounded-xl transition duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="ml-1 border-none w-full h-full focus:outline-none rounded-xl placeholder:font-sans"
        />
      </div>
    </div>

    <button
      type="submit"
      className="mt-5 mb-2 bg-[#151717] text-white text-[15px] font-medium rounded-xl h-12 w-full hover:bg-[#252727] transition"
    >
      Log In
    </button>

    <p className="text-center text-black text-sm my-1">
      Don’t have an account?
      <Link
        to="/signup"
        className="text-[#2d79f3] font-medium cursor-pointer ml-1 hover:underline"
      >
        Sign up
      </Link>
    </p>

    <div className="flex flex-row gap-3">
      <button
        type="button"
        className="flex justify-center items-center gap-2 w-full h-12 border border-[#ededef] rounded-xl bg-white hover:border-[#2d79f3] transition"
      >
        <svg
          version="1.1"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="#FBBB00"
            d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z"
          ></path>
          <path
            fill="#518EF8"
            d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535 c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
          ></path>
          <path
            fill="#28B446"
            d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
          ></path>
          <path
            fill="#F14336"
            d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0 C318.115,0,375.068,22.126,419.404,58.936z"
          ></path>
        </svg>
        Google
      </button>
    </div>
  </form>
</div>) } 
</>

  );
}

export default Login;