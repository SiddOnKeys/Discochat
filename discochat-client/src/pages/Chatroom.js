import MessageInput from "./components/MessageInput";
import MessageRender from "./components/MessageRender";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
function Chatroom() {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();

  messagesRef.current = messages;

  //PING SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      let lastItem = {
        ...messagesRef.current[messagesRef.current.length - 1],
        image: undefined,
      };

      console.log({ lastItem });

      if (lastItem) {
        axios.post("http://localhost:3005/test", lastItem).then((res) => {
          if (res.data === "error") {
            console.log("error in response");
          } else if (res.data === "No new messages") {
            console.log("No new messages");
          } else if (!(res.data.length === 1)) {
            console.log("success");
            console.log(res.data);
            let newData = res.data.slice(1);
            console.log(newData);
            setMessages((currentState) => [...currentState, ...newData]);
          }
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [reload, setReload] = useState();
  const [call, setCall] = useState(false);

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
          call={call}
        />
        <MessageInput
          messages={messages}
          setMessages={setMessages}
          setCall={setCall}
          call={call}
        />
      </div>
    </div>
  );
}

export default Chatroom;
