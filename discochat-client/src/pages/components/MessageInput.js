import axios from "axios";
import { useEffect, useRef, useState } from "react";
import addbutton from "../../addButton.svg";
import ImageInput from "./ImageInput";

function MessageInput({ messages, setMessages, setCall, call }) {
  const [image, setImage] = useState("");
  const [text, setText] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const messagesRef = useRef();
  const textRef = useRef();
  const imageRef = useRef();

  const textInputRef = useRef();
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

    if (isFormValid) {
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
          console.log("MessageSent");
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
    } else {
      console.log("formnotfilled");
    }
  };
  const [popup, setPopup] = useState(false);

  const handlePopup = (e) => {
    setPopup(!popup);
  };
  const handleImage = (e) => {
    handleSubmit(e);
  };

  useEffect(() => {
    setIsFormValid(image || text);
  }, [image, text]);

  useEffect(() => {
    if (imageRef.current || textRef.current) {
      textInputRef.current.focus();
    }
  }, [imageRef.current, textRef.current]);

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
            ref={textInputRef}
            type="text"
            name="text"
            placeholder="Message the group chat!"
            onChange={updateText}
            value={text}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
