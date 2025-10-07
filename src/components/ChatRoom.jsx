import { useEffect, useState, useRef } from "react";
import { auth, db } from "../config/Firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "./Hooks/useToast";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function ChatRoom() {
  const { showSuccess } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const HandleLogout = async ()=> {
    const auth = getAuth();
        setLoading(true);

   await signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        showSuccess("signed out successfully");

        setTimeout(() => navigate("/login"), 500);
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
        showError("Error signing out:");
      });
  }

  const [message, setMessage] = useState([]);
  const bottomRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessage(msgs);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, []);

 return (
  <>
    {loading ? (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900"> 
        <ScaleLoader color="#ec4899" /> 
    </div>
) : (
    <div 
        className="flex flex-col h-screen w-screen bg-gray-900 text-white" 
        style={{
            backgroundImage: "url('https://cdn.vectorstock.com/i/750p/87/32/dark-indigo-grunge-texture-vector-34488732.avif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed' 
        }}
    > 
        
        <div className="flex justify-between items-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm border-b border-white/10">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">💬 Chat Room</h1>
            <button
                onClick={HandleLogout}
                className="text-white bg-pink-500 hover:bg-pink-600 font-semibold p-2 px-3 sm:px-4 rounded-full transition duration-200 shadow-lg text-sm"
            >
                Log Out
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-black/20"> 
            {message.map((msg) => (
                <Message key={msg.id} message={msg} /> 
            ))}
            <div ref={bottomRef}></div>
        </div>

        <div className="p-3 sm:p-4 bg-black/70 border-t border-white/10"> 
             <SendMessage />
        </div>
        
    </div>
)}
  </>
);

}

export default ChatRoom;
