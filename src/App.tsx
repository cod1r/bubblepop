import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bubbles, setBubbles] = useState<
    Array<[number, number, number, number]>
  >([]);
  useEffect(() => {
    setInterval(() => {
      setBubbles((p) => {
        let bubbles_clone = structuredClone(p);
        for (let i = 0; i < bubbles_clone.length;) {
          if (bubbles_clone[i][1] + bubbles_clone[i][3] + 60 < window.innerHeight) {
            bubbles_clone[i][1] += bubbles_clone[i][3];
          } else {
            bubbles_clone.splice(i, 1);
            continue;
          }
          if (
            bubbles_clone[i][0] + bubbles_clone[i][2] < 0 ||
            bubbles_clone[i][0] + bubbles_clone[i][2] + 60 > 600
          ) {
            bubbles_clone[i][2] = -bubbles_clone[i][2];
          }
          bubbles_clone[i][0] += bubbles_clone[i][2];
          i++;
        }
        return bubbles_clone;
      });
    }, 10);
    setInterval(() => {
      setBubbles((p) => {
        const newbubble: [number, number, number, number] = [
          Math.floor(Math.random() * 541),
          -60,
          [-1, 1][Math.floor(Math.random() * 2)],
          1,
        ];
        const newb = [...p, newbubble];
        return newb;
      });
    }, 1000);
  }, []);
  return (
    <div onClick={(e) => console.log(e.target)} className="container">
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
            top: `${b[1]}px`,
            left: `${b[0]}px`,
            borderRadius: "100%",
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;
