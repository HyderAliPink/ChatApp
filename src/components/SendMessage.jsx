import { useState } from "react";
import { auth, db, onAuthStateChanged } from "../config/Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "./Hooks/useToast";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import useAuthListener from "./Checkauth";

function SendMessage() {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { showError } = useToast();
  const navigate = useNavigate();
  

const { loading } = useAuthListener();

if (loading) return <div className="text-white p-4">Checking authentication...</div>;



  const SendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      showError("Text cannot be empty.");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      uid,
      displayName,
      photoURL,
      createdAt: serverTimestamp(),
    });

    setShowEmoji(false);
    setMessage("");
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
          <ScaleLoader color="#3b82f6" />
        </div>
      ) : (
        <div className="relative">
          <form
            onSubmit={SendMessage}
            className="flex items-center gap-2 p-4 bg-gray-900"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Emoji Toggle Button */}
            <button
              type="button"
              onClick={() => setShowEmoji((prev) => !prev)}
              className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            >
              😄
            </button>

            {/* Send Button */}
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>

          {/* Emoji Picker */}
          {showEmoji && (
            <div className="absolute bottom-16 right-4 z-50">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="dark"
                searchDisabled={false}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SendMessage;
