import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/DashBoard';
import { getDatabase, ref, onValue } from 'firebase/database';
import logo from '../../public/MeowMeow.png'

export default function ChatApp() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    } else {
      const database = getDatabase();
      const chatRoomsRef = ref(database, 'ChatRooms');

      onValue(chatRoomsRef, (snapshot) => {
        if (snapshot.exists()) {
          const chatRoomsData = snapshot.val();
          const chatRoomsArray = Object.keys(chatRoomsData).map((roomId) => {
            return {
              id: roomId,
              name: chatRoomsData[roomId].Name,
            };
          });
          setChatRooms(chatRoomsArray);
        } else {
          setChatRooms([]);
        }
      });
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className='bg-light min-h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center justify-start mt-8">
        <img src={logo} className='w-72' alt="Logo" />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-xl mb-1">Welcome to MeowMeow, {currentUser.displayName}!</h1>
        <Dashboard chatRooms={chatRooms} currentUser={currentUser} />
      </div>
    </div>

  );
}