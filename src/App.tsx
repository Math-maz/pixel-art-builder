import React, { useRef, useEffect, useState, MouseEventHandler } from "react";
import { SketchPicker } from "react-color";
// @ts-ignore
import { exportComponentAsPNG } from "react-component-export-image";
import { debounce } from "./utils/debounce";

function App() {
  const BOX_WIDTH = 800;
  // Box height
  const BOX_HEIGHT = 600;
  // Padding
  const PADDING = 0;
  const CELL_SIZE = 20;
  const [selectedColor, setSelectedColor] = useState("#dddddd");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current?.getContext("2d")) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        drawBoard(context, "black");
      }
    }
  }, []);
  const drawBoard = (context: CanvasRenderingContext2D, strokeColor: string) => {
    // context.clearRect(0, 0, canvasRef.current?.width!, canvasRef.current?.height!)
    for (let x = 0; x <= BOX_WIDTH; x += CELL_SIZE) {
      context.moveTo(0.5 + x + PADDING, PADDING);
      context.lineTo(0.5 + x + PADDING, BOX_HEIGHT + PADDING);
    }
    for (let x = 0; x <= BOX_HEIGHT; x += CELL_SIZE) {
      context.moveTo(PADDING, 0.5 + x + PADDING);
      context.lineTo(BOX_WIDTH + PADDING, 0.5 + x + PADDING);
    }
    context.strokeStyle = strokeColor
    context.stroke();
  };

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
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
        context.fillStyle = selectedColor;
        context.fillRect((X * CELL_SIZE) + 1, (Y * CELL_SIZE) + 1, CELL_SIZE - 1, CELL_SIZE - 1);
        // drawBoard(context, "black");
      }
    }
  };
  const handleCanvasMouseOver = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!e.altKey) return
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
        context.fillStyle = selectedColor;
        context.fillRect((X * CELL_SIZE) + 1, (Y * CELL_SIZE) + 1, CELL_SIZE - 1, CELL_SIZE - 1);
        // drawBoard(context, "black");
      }
    }
  };
  const handleExport = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!canvasRef.current) {
        return
      }
      const canvas2DContext = canvasRef.current.getContext("2d")!
      drawBoard(canvas2DContext, "#e8e8e8")
      exportComponentAsPNG(canvasRef)
      drawBoard(canvas2DContext, "black")
    }
  }
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
          width={BOX_WIDTH}
          height={BOX_HEIGHT}
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseOver}
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
            onClick={handleExport(canvasRef)}
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
              const context = canvasRef.current?.getContext("2d");
              if (context) {
                context.fillStyle = "#e8e8e8"
                context.fillRect(0, 0, canvasRef.current?.width!, canvasRef.current?.height!)
                drawBoard(context, "black")
              }
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
