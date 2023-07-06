import axios from "axios";
import { useEffect, useRef, useState } from "react";
import addbutton from "../../addButton.svg";
import ImageInput from "./ImageInput";

function MessageInput({ messages, setMessages, setCall, call }) {
  const [image, setImage] = useState("");
  const [text, setText] = useState();
  const messagesRef = useRef();
  const textRef = useRef();
  const imageRef = useRef();
  textRef.current = text;
  imageRef.current = image;
  messagesRef.current = messages;

  const updateText = (e) => {
    setText(e.target.value);
  };

  const convertToBase64 = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error:", error);
      };
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopup(false);

    const data = {
      id: Math.random().toString(),
      name: localStorage.getItem("username"),
      text: textRef.current,
      image: imageRef.current,
    };
    setMessages([...messagesRef.current, data]);
    axios
      .post("http://localhost:3005", data)
      .then((res) => {
        const newMessage = res.data;
        console.log(newMessage);
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
    setImage("");
  };
  const [popup, setPopup] = useState(false);

  const handlePopup = (e) => {
    setPopup(!popup);
  };
  const handleImage = (e) => {
    handleSubmit(e);
    console.log(messagesRef.current);
  };
  return (
    <div className="input-wrapper">
      {image ? (
        <div className="upload-preview overlay">
          {<img className="preview-image" src={image} />}
        </div>
      ) : null}
      <form name="input" onSubmit={handleImage} onChange={convertToBase64}>
        {popup && <ImageInput popup={popup} setPopup={setPopup} />}
        <div style={{ position: "relative" }}>
          <div className="image-icon">
            <button
              id="add-button"
              onClick={handlePopup}
              type="button"
            ></button>
            <label for="add-button">
              <img style={{ padding: "8px" }} src={addbutton} />
            </label>
          </div>

          <input
            type="text"
            name="text"
            placeholder="Message the group chat!"
            required
            onChange={updateText}
            value={text}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
