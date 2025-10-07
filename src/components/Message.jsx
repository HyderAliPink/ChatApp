import React from "react";
import { auth } from "../config/Firebase";

export default function Message({ message }) {
  const isUser = message.uid === auth.currentUser?.uid;

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <img
          src={message.photoURL || "https://api.dicebear.com/8.x/avataaars/svg?seed=Default"}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-gray-500"
        />
      )}

      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"
        }`}
      >
        {!isUser && (
          <p className="text-xs text-gray-300 mb-1 font-semibold">
            {message.displayName}
          </p>
        )}
        <p>{message.text}</p>
      </div>

      {isUser && (
        <img
          src={message.photoURL || "https://api.dicebear.com/8.x/avataaars/svg?seed=Default"}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-gray-500"
        />
      )}
    </div>
  );
}
