import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

function Sidebar({ messages }) {
  const userCounts = {};
  const clientDate = Date.parse(new Date());

  let activeUsers = new Set();

  const uniqueNames = new Set();
  messages.map((user) => {
    uniqueNames.add(user.name);
    if (userCounts[user.name]) {
      userCounts[user.name] += 1;
    } else {
      userCounts[user.name] = 1;
    }
    if (clientDate - Date.parse(user.date) <= 86400000) {
      activeUsers.add(user.name);
    }
  });

  let maxNum = 0;
  let mvp = { username: 0, value: 0 };

  Object.keys(userCounts).map((property) => {
    if (userCounts[property] >= maxNum) {
      maxNum = userCounts[property];
      mvp = { username: property, value: maxNum };
    }
  });

  const user = useContext(UserContext);
  const username = localStorage.getItem("username");
  const handleUsername = () => {
    user.updateUsername();
  };
  return (
    <div>
      <h1 className="hello">Hello {username}!</h1>
      <button type="button" onClick={handleUsername}>
        Change Username
      </button>
      <div className="user-stats">
        <p>Total Users: {uniqueNames.size}</p>
        <p>Active Users: {activeUsers.size}</p>
        <p>MVP User: {mvp.username}</p>
      </div>
    </div>
  );
}

export default Sidebar;
