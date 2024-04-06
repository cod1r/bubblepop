import { useState, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [bubbles, setBubbles] = useState<
    Array<[number, number, number, number, string]>
  >([]);
  const backgroundDiv = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setInterval(() => {
      setBubbles((p) => {
        let bubbles_clone = structuredClone(p);
        for (let i = 0; i < bubbles_clone.length; ) {
          if (
            bubbles_clone[i][1] + bubbles_clone[i][3] + 60 <
            window.innerHeight
          ) {
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
        const newbubble: [number, number, number, number, string] = [
          Math.floor(Math.random() * 541),
          -60,
          [-1, 1][Math.floor(Math.random() * 2)],
          1,
          `${p.length}`,
        ];
        const newb = [...p, newbubble];
        return newb;
      });
    }, 1500);
  }, []);
  return (
    <div
      onClick={(e) => {
        let domrect = backgroundDiv.current?.getBoundingClientRect();
        if (domrect === undefined) {
          return;
        }
        setBubbles((p) => {
          let diff = false;
          for (let i = 0; i < p.length; ) {
            const dist = Math.sqrt(
              Math.pow(e.clientY - domrect.y - (p[i][1] + 30), 2) +
                Math.pow(e.clientX - domrect.x - (p[i][0] + 30), 2),
            );
            if (dist <= 30) {
              p.splice(i, 1);
              const audio = new Audio("bubble-pop-100784.mp3");
              audio.play();
              diff = true;
              continue;
            }
            i++;
          }
          return diff ? structuredClone(p) : p;
        });
      }}
      className="container"
    >
      {bubbles.map((b, idx) => (
        <div
          key={`${idx}-${b[4]}`}
          style={{
            zIndex: "-1000",
            width: "60px",
            height: "60px",
            backgroundImage:
              "radial-gradient(circle at center, transparent 0, transparent 40%, lightblue 100%)",
            position: "absolute",
            transform: `translateX(${b[0]}px) translateY(${b[1]}px)`,
            borderRadius: "100%",
          }}
        ></div>
      ))}
      <div ref={backgroundDiv} className="background"></div>
    </div>
  );
}

export default App;
