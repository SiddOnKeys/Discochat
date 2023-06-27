import { render } from "react-dom";
import "./App.css";
import JoinForum from "./pages/JoinForum";
import Chatroom from "./pages/Chatroom";

import { createContext, useState } from "react";
import "@fontsource/inter";

export const UserContext = createContext();
const App = () => {
  const [username, setUsername] = useState(false);
  const updateUsername = () => {
    console.log("app");
    localStorage.removeItem("username");
    setUsername(!username);
  };

  const userData = localStorage.getItem("username");

  if (userData == null) {
    console.log("error fetching user D");
  }

  // useEffect(() => {
  //     check(); //used inside useEffect
  //      }, [])

  return (
    <UserContext.Provider value={{ updateUsername }}>
      <div>{userData ? <Chatroom /> : <JoinForum />}</div>
    </UserContext.Provider>
  );
};

export default App;
