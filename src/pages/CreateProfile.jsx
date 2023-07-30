import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleCreateProfile = () => {
    if (!currentUser) {
      setError("You must be logged in to create a profile.");
      return;
    }

    if (!username || !imgUrl) {
      setError("Please fill in both username and image URL fields.");
      return;
    }

    const auth = getAuth();
    updateProfile(auth.currentUser, { displayName: username, photoURL: imgUrl })
      .then(() => {
        console.log("Profile updated successfully!");
        setImgUrl('')
        setUsername('')
        setError('');
        navigate('/app');
      })
      .catch((error) => {
        setError("Error updating profile: " + error.message);
      });
  };

  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center text-light">
      <h2 className="text-4xl font-semibold mb-6">Create a Profile:</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="w-64 text-black">
        <div className="mb-4">
          <label htmlFor="username" className="text-lg font-medium block">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imgUrl" className="text-lg font-medium block">
            Image URL:
          </label>
          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your image URL"
            required
          />
        </div>
        <button
          type="button"
          onClick={handleCreateProfile}
          className="w-full py-2 border border-light px-4 rounded-lg text-white font-semibold focus:outline-none"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
