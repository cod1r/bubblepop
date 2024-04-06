import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {}, []);
  return (
    <div onClick={(e) => console.log(e.target.key)} className="container">
      {bubbles.map((b, idx) => (
        <div
          key={`${idx}-${b}`}
          onClick={() => {}}
          style={{
            width: "60px",
            height: "60px",
            backgroundImage:
              "radial-gradient(circle at center, transparent 0, lightblue 90%, blue 100%)",
            position: "absolute",
            top: `${b}px`,
            borderRadius: "100%",
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
