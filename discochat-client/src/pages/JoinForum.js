import { useEffect, useState } from "react";

const JoinForum = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => localStorage.setItem("username", username);

  const UpdateUsername = (e) => {
    setUsername(e.target.value);
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            className="username-container"
            type="text"
            value={username}
            onChange={UpdateUsername}
          />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return renderForm;
};

export default JoinForum;
