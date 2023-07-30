import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';

const ChatRoomList = ({ setSelectedRoomId, selectedRoomId }) => {
  const { currentUser } = useAuth();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const database = getDatabase();
    const chatRoomsRef = ref(database, 'ChatRooms');

    onValue(chatRoomsRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatRoomsData = snapshot.val();
        const userUid = currentUser.uid;

        const chatRoomsArray = Object.keys(chatRoomsData).map((roomId) => {
          const members = chatRoomsData[roomId].Members;
          const isMember = members && members[userUid] === true;

          return {
            id: roomId,
            name: chatRoomsData[roomId].Name,
            isMember: isMember,
          };
        });

        setChatRooms(chatRoomsArray);
      } else {
        setChatRooms([]);
      }
    });
  }, [currentUser]);

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
  };

  return (
   <div className="mt-4 text-center">
      <h2 className="text-xl font-bold mb-2">Chat Rooms:</h2>
      <ul>
        {chatRooms.map((chatRoom) => (
          chatRoom.isMember ? (
            <li key={chatRoom.id} className="mb-2">
              <button
                className={`text-black font-semibold py-2 rounded ${selectedRoomId === chatRoom.id ? 'bg-dark text-light' : 'text-black'}`}
                onClick={() => handleSelectRoom(chatRoom.id)}
              >
                {chatRoom.name}
              </button>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
};  

export default ChatRoomList;
