import React from "react";
import { useState } from "react";

function ImageInput({ setPopup, popup }) {
  const [over, setOver] = useState("");
  const handlePopup = () => {
    setPopup(!popup);
  };
  return (
    <div className="Image-input-wrapper">
      <input
        type="file"
        accept="image/*"
        id="upload-image-button"
        className="upload-btn"
        onChange={handlePopup}
      ></input>
      <label
        className="Image-input-label"
        onMouseEnter={() => {
          setOver("#e7e8f7");
        }}
        onMouseLeave={() => {
          setOver("#48485f");
        }}
        for="upload-image-button"
      >
        <svg
          width="26px"
          height="26px"
          viewBox="0 0 24 24"
          fill="#48485f"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V16.999V17.001V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14V6ZM19 6V14.5858L15.7071 11.2929C15.3166 10.9024 14.6834 10.9024 14.2929 11.2929L13 12.5858L9.20711 8.79289C8.81658 8.40237 8.18342 8.40237 7.79289 8.79289L5 11.5858V6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6ZM5 18V14.4142L8.5 10.9142L12.2929 14.7071C12.6834 15.0976 13.3166 15.0976 13.7071 14.7071L15 13.4142L19 17.4142V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18ZM14.5 10C15.3284 10 16 9.32843 16 8.5C16 7.67157 15.3284 7 14.5 7C13.6716 7 13 7.67157 13 8.5C13 9.32843 13.6716 10 14.5 10Z"
              fill={over}
            ></path>{" "}
          </g>
        </svg>
        Upload image
      </label>
      <input
        disabled={true}
        type="file"
        id="upload-file-button"
        className="upload-btn"
        onMouseEnter={() => {
          setOver("#e7e8f7");
        }}
        onMouseLeave={() => {
          setOver("#48485f");
        }}
      ></input>

      <label className="Image-input-label" for="upload-file-button">
        <svg
          fill="#48485f"
          width="25px"
          height="25px"
          viewBox="-6 -4 40 40"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#48485f"
        >
          <g id="SVGRepo_iconCarrier">
            <title>file</title>
            <path d="M4 30.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-22.016l-8-8h-13.984q-0.832 0-1.44 0.608t-0.576 1.408v28zM8 28v-24h10.016v6.016h5.984v17.984h-16z"></path>{" "}
          </g>
        </svg>
        <div style={{ marginRight: "8px", color: "#48485f" }}>
          Upload a file
        </div>
      </label>
    </div>
  );
}

export default ImageInput;
