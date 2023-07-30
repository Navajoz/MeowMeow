import React, { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, onValue, push, get, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';

const ChatRoom = (props) => {
  const { roomId } = props;
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const createPrivateChatRoom = (selectedUser) => {
    const database = getDatabase();
    const currentUserId = currentUser.uid;
    const roomName = 'Private Chat'
    const roomId = `privatechat${currentUserId, selectedUser}`
    const roomRef = ref(database, `ChatRooms/${roomId}`);

    get(roomRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          const members = { [currentUserId]: true, [selectedUser]: true };
          set(roomRef, { Members: members, Name: roomName });
        }
      })
      .catch((error) => {
      });

    handleCancelPrivateChat();
  };

  useEffect(() => {
    if (!currentUser || !roomId) return;

    const database = getDatabase();
    const messagesRef = ref(database, `ChatRooms/${roomId}/Messages`);

    const messagesListener = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesArray = Object.keys(messagesData).map((messageId) => ({
          id: messageId,
          ...messagesData[messageId],
        }));
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });

    return () => {
      messagesListener();
    };
  }, [roomId, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !roomId) return;

    const database = getDatabase();
    const messagesRef = ref(database, `ChatRooms/${roomId}/Messages`);

    const newMessage = {
      content: messageInput,
      senderId: currentUser.uid,
      senderName: currentUser.displayName,
      senderPhotoURL: currentUser.photoURL,
      timestamp: new Date().toISOString(),
    };

    push(messagesRef, newMessage);
    setMessageInput('');
  };

  const handlePrivateChat = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  const handleCancelPrivateChat = () => {
    setSelectedUser(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto w-screen max-w-xl">
      <div className="p-2 w-s">
        <div className="max-h-96 overflow-y-auto w-screen max-w-xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${currentUser.uid === message.senderId
                ? 'flex justify-end'
                : 'flex justify-start'
                }`}
            >
              <div
                className={`${currentUser.uid === message.senderId
                  ? 'bg-dark text-white'
                  : 'bg-medium text-gray-800'
                  } px-4 py-2 rounded-lg`}
              >
                <div className="flex items-center mb-2">
                  {currentUser.uid !== message.senderId && (
                    <img
                      src={message.senderPhotoURL}
                      alt="Sender Avatar"
                      className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                      onClick={() => handlePrivateChat(message.senderId)}
                    />
                  )}
                  <span>{message.content}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  {currentUser.uid !== message.senderId && (
                    <span className="xxs">{message.senderName}</span>
                  )}
                  <span className="text-gray-500">
                    {message.timestamp.slice(11, 16)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 p-2 border border-gray-400 rounded-full"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-dark py-2 text-white px-4 rounded-full"
          >
            Send
          </button>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>Do you want to create a private chat with this user?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleCancelPrivateChat}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => createPrivateChatRoom(selectedUser)}
              >
                Create Private Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
