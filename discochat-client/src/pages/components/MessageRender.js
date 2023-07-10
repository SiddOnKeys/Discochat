import axios from "axios";
import { useEffect, useState, useRef } from "react";

function MessageRender({ messages, setMessages, call }) {
  const chatboxRef = useRef(null);
  const generateRandomHexCode = () => {
    const hexCodeArray = [];

    const generateHexCode = () => {
      const characters = "0123456789ABCDEF";
      let hexCode = "#";

      for (let i = 0; i < 6; i++) {
        hexCode += characters[Math.floor(Math.random() * 16)];
      }

      return hexCode;
    };

    const getRandomUniqueHexCode = () => {
      let hexCode = generateHexCode();

      while (hexCodeArray.includes(hexCode)) {
        hexCode = generateHexCode();
      }

      hexCodeArray.push(hexCode);
      return hexCode;
    };

    return getRandomUniqueHexCode();
  };

  const calculateDate = (res) => {
    const serverDate = new Date(res);
    const clientDate = new Date();

    let formattedDate;

    if (serverDate.getDate() === clientDate.getDate()) {
      formattedDate =
        "Today at " +
        serverDate.toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

      return formattedDate;
    } else if (
      serverDate.getDate() === clientDate.getDate() - 1 &&
      serverDate.getMonth() === clientDate.getMonth() &&
      serverDate.getFullYear() === clientDate.getFullYear()
    ) {
      formattedDate =
        "Yesterday at " +
        serverDate.toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

      return formattedDate;
    } else {
      const formattedDate = serverDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedDate;
    }
  };
  const apiCall = () => {
    console.log("making api call");

    axios
      .get("http://localhost:3005/")
      .then((res) => {
        let array;
        if (res.data.length >= 60) {
          array = res.data.slice(-50);
        } else {
          array = res.data;
        }
        console.log(array);
        setMessages(array);
      })
      .catch((err) => {
        console.log(err.msg);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    chatboxRef.current?.lastChild?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const profileColors = (data) => {
    const newHexCode = generateRandomHexCode();
    if (localStorage.getItem(`${data.name}`)) {
      return;
    } else {
      localStorage.setItem(`${data.name}`, newHexCode);
    }
  };

  // Mapping throught the DB Data response

  const getMessages = messages.map((data, index) => {
    const formattedDate = calculateDate(data.date);
    profileColors(data);
    if (index > 0 && data.id === messages[index - 1].id) {
      // If the current ID is the same as the previous ID, don't return anything
      return;
    }
    return (
      <div className="date-wrap" key={data.id}>
        <div className="MessageObject" key={data.id}>
          <div
            className="colour-circle"
            style={{
              "background-color": `${localStorage.getItem(data.name)}`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="white"
              class="bi bi-discord"
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
          </div>

          <div className="MessageWrapper">
            <div className="username">
              <em>{data.name}</em>
            </div>

            {data.image ? (
              <span>
                <img
                  className={"image-preview " + (data.date ? "" : "overlay")}
                  src={data.image}
                ></img>
              </span>
            ) : null}
            <div className={"message " + (data.date ? "" : "overlay")}>
              {data.text}
            </div>
          </div>
        </div>
        <div className="date">{data.date && <em>{formattedDate}</em>} </div>
      </div>
    );
  });

  return (
    <div className="chatbox" ref={chatboxRef}>
      {getMessages}
    </div>
  );
}

export default MessageRender;
