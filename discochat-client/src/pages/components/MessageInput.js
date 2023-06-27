import axios from "axios";
import { useEffect, useRef, useState } from "react";

function MessageInput({ messages, setMessages }) {
  const [text, setText] = useState();
  const messagesRef = useRef();
  messagesRef.current = messages;

  const updateText = (e) => {
    setText(e.target.value);
  };

  const data = {
    id: Math.random().toString(),
    name: localStorage.getItem("username"),
    text: text,
    date: new Date(),
  };

  useEffect(() => {
    setInterval(() => {
      let lastItem = messagesRef.current[messagesRef.current.length - 1];

      axios.post("http://localhost:3005/test", lastItem).then((res) => {
        console.log(res.data.length);
        console.log(!(res.data.length === 1));
        console.log(res.data);
        if (res.data === "error") {
          console.log("error in response");
        } else if (!(res.data.length === 1)) {
          console.log("success");
          console.log(res.data);
          let newData = res.data.slice(1);
          console.log(newData);
          setMessages((currentState) => [...currentState, ...newData]);
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {}, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((currentState) => [...currentState, data]);

    axios
      .post("http://localhost:3005", data)
      .then((res) => {
        const newMessage = res.data;

        setMessages((messages) =>
          messages.map((message) => {
            if (message.id === newMessage.id) {
              return newMessage;
            } else {
              return message;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    setText("");
  };

  return (
    <div className="input-wrapper">
      <form name="input" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Type Something..."
          required
          onChange={updateText}
          value={text}
        />
      </form>
    </div>
  );
}

export default MessageInput;
