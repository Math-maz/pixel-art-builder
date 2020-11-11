import { Console } from "console";
import React, { useRef, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
// @ts-ignore
import { exportComponentAsPNG } from "react-component-export-image";

function App() {
  const PADDING = 0;
  const CELL_SIZE = 20;
  const [selectedColor, setSelectedColor] = useState("#dddddd");
  const [boxWidth, setBoxWidth] = useState(800);
  const [boxHeight, setBoxHeight] = useState(600);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current?.getContext("2d")) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        drawBoard(context);
      }
    }
  }, []);
  const drawBoard = (context: CanvasRenderingContext2D) => {
    for (let x = 0; x <= boxWidth; x += CELL_SIZE) {
      context.moveTo(0.5 + x + PADDING, PADDING);
      context.lineTo(0.5 + x + PADDING, boxHeight + PADDING);
    }
    for (let x = 0; x <= boxHeight; x += CELL_SIZE) {
      context.moveTo(PADDING, 0.5 + x + PADDING);
      context.lineTo(boxWidth + PADDING, 0.5 + x + PADDING);
    }
    context.strokeStyle = "#222831";
    context.stroke();
  };

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    console.log(e);
    const context = canvasRef.current?.getContext("2d");
    const rect = canvasRef.current?.getBoundingClientRect();
    let X, Y;
    if (rect) {
      X = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      Y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      console.log({
        x: Math.floor((e.clientX - rect.left) / CELL_SIZE),
        y: Math.floor((e.clientY - rect.top) / CELL_SIZE),
      });
      if (context) {
        if (e.altKey) context.fillStyle = "#e8e8e8";
        else context.fillStyle = selectedColor;
        context.fillRect(X * CELL_SIZE, Y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        drawBoard(context);
      }
    }
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          marginBottom: 24,
          marginTop: 16,
          fontSize: 36,
          color: "#e8e8e8",
          fontFamily: "sans-serif",
        }}
      >
        PIXEL ART GENERATOR
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <canvas
          width={`${boxWidth}px`}
          height={`${boxHeight}px`}
          ref={canvasRef}
          onClick={handleCanvasClick}
          onKeyPress={(e) => console.log(e)}
          onKeyDown={(e) => console.log(e)}
          style={{ border: "1px solid #30475e", backgroundColor: "#e8e8e8" }}
        />
        <section>
          <SketchPicker
            color={selectedColor}
            onChangeComplete={(color) => setSelectedColor(color.hex)}
          />

          <button
            style={{
              width: "100%",
              marginTop: 10,
              height: 48,
              backgroundColor: "#f05454",
              borderRadius: 12,
              cursor: "pointer",
              outline: "none",
              color: "white",
              border: "none",
            }}
            onClick={() => exportComponentAsPNG(canvasRef)}
          >
            EXPORTAR
          </button>
          <button
            style={{
              width: "100%",
              marginTop: 10,
              height: 48,
              backgroundColor: "#f05454",
              borderRadius: 12,
              cursor: "pointer",
              outline: "none",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              setSelectedColor("#e8e8e8");
            }}
          >
            RESETAR
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
