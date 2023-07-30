import React, { useState } from 'react';
import UserDisplay from './UserDisplay';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';


const Dashboard = ({ currentUser }) => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  return (
    <div className="container mx-96 border border-dark rounded w-screen min-h-fit min-w-fit">
      <div className="grid grid-cols-2 min-h-fit min-w-fit">
        <div className="border-r border-dark min-h-fit min-w-fit">
          <UserDisplay currentUser={currentUser} />
          <ChatRoomList className='text-center' setSelectedRoomId={setSelectedRoomId} />
        </div>

        {selectedRoomId && (
          <div className="min-w-fit min-h-fit">
            <h2 className="text-5xl text-center font-bold mb-2 font-titulos py-5 bg-dark text-light">MEOWMEOW</h2>
            <ChatRoom roomId={selectedRoomId} currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;