import MessageInput from "./components/MessageInput";
import MessageRender from "./components/MessageRender";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [reload, setReload] = useState();

  return (
    <div className="chatroom-app">
      <div className="sidebar">
        <Sidebar messages={messages} />
      </div>
      <div className="chat-wrapper">
        <MessageRender
          messages={messages}
          setMessages={setMessages}
          setReload={setReload}
        />
        <MessageInput messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default Chatroom;
