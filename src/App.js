import Pomodoro from "./pomodoro.js";
import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import "./index.css"



function App() {
  const [backgroundColor, setBackgroundColor] = useState("red");
  const [textColor, setTextColor] = useState("black");
  const [backgroundColorModal, setBackgroundColorModal] = useState(false);
  const [textColorModal, setTextColorModal] = useState(false);
  const [font, setFont] = useState("arial");

  useEffect(() => {
    const bgColor = localStorage.getItem("my-background-color");
    const txColor = localStorage.getItem("my-text-color");
    if (bgColor) setBackgroundColor(JSON.parse(bgColor));
    if (txColor) setTextColor(JSON.parse(txColor));
  }, []);
  useEffect(() => {
    localStorage.setItem("my-background-color", JSON.stringify(backgroundColor));
    localStorage.setItem("my-text-color", JSON.stringify(textColor));
  });

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontFamily: font,
      }}
      className="everything"
    >
      <h1>POMODORO TIMER</h1>
      <Pomodoro />

      <label>Type a font name here to change the font:</label>
      <select value={font} onChange={(event) => setFont(event.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Cambria">Cambria</option>
        <option value="Courier New">Courier New</option>
        <option value="Cursive">Cursive</option>
        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
        <option value="Georgia">Georgia</option>
        <option value="Impact">Impact</option>
        <option value="Segoe UI">Segoe UI</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Verdana">Verdana</option>
      </select>

      <button onClick={() => setBackgroundColorModal(!backgroundColorModal)}>
        {" "}
        {backgroundColorModal ? "Close" : "Open"} Background Color Picker
      </button>
      {backgroundColorModal ? (
        <SketchPicker
          color={backgroundColor}
          onChangeComplete={(newColor) => setBackgroundColor(newColor.hex)}
        />
      ) : (
        ""
      )}

      <button onClick={() => setTextColorModal(!textColorModal)}>
        {" "}
        {textColorModal ? "Close" : "Open"} Text Color Picker
      </button>
      {textColorModal ? (
        <SketchPicker
          color={textColor}
          onChangeComplete={(newColor) => setTextColor(newColor.hex)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
