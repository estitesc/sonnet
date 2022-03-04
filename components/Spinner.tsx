import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useRef } from "react";
import _ from "lodash";

const NUM_CIRCLES = 3;
const X_POS_MIN = 0;
const X_POS_MAX = 250;
const Y_POS_MIN = 0;
const Y_POS_MAX = 250;
const MAX_SPEED = 60;

const CIRCLE_DIAMETER = 10;

const Home: NextPage = () => {
  const initXPos = Array.apply(null, Array(NUM_CIRCLES)).map(() =>
    _.random(X_POS_MIN, X_POS_MAX)
  );
  const initYPos = Array.apply(null, Array(NUM_CIRCLES)).map(() =>
    _.random(Y_POS_MIN, Y_POS_MAX)
  );

  const initXVel = Array.apply(null, Array(NUM_CIRCLES)).map(() => 0);
  const initYVel = Array.apply(null, Array(NUM_CIRCLES)).map(() => 0);
  const canvasRef = useRef(null);
  const xPos = useRef(initXPos);
  const yPos = useRef(initYPos);
  const xVel = useRef(initXVel);
  const yVel = useRef(initYVel);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.fillStyle = "#0B0705";
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
    for (let i = 0; i < NUM_CIRCLES; i++) {
      drawCircle(ctx, frameCount, i);
    }
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    circle: number
  ) => {
    ctx.fillStyle = "#fdfcfc";
    ctx.beginPath();
    ctx.arc(
      xPos.current[circle],
      yPos.current[circle],
      CIRCLE_DIAMETER,
      0,
      2 * Math.PI
    );
    ctx.fill();
  };

  const update = (frameCount: number) => {
    for (let i = 0; i < NUM_CIRCLES; i++) {
      xPos.current[i] += xVel.current[i] / 10;
      yPos.current[i] += yVel.current[i] / 10;
      let xDelt = 0;
      let yDelt = 0;
      for (let j = 0; j < NUM_CIRCLES; j++) {
        if (j != i) {
          xDelt += xPos.current[i] - xPos.current[j];
          yDelt += yPos.current[i] - yPos.current[j];
        }
      }
      xVel.current[i] = Math.min(
        xVel.current[i] - Math.sign(xDelt) * Math.pow(xDelt / 200, 2),
        MAX_SPEED
      );
      yVel.current[i] = Math.min(
        yVel.current[i] - Math.sign(yDelt) * Math.pow(yDelt / 200, 2),
        MAX_SPEED
      );
    }
  };

  const driftToCenter = (context: CanvasRenderingContext2D) => {
    const canvasCenterX = context.canvas.width / 2;
    const canvasCenterY = context.canvas.height / 2;

    let xSum = 0;
    let ySum = 0;
    for (let i = 0; i < NUM_CIRCLES; i++) {
      xSum += xPos.current[i];
      ySum += yPos.current[i];
    }
    const xAvg = xSum / NUM_CIRCLES;
    const yAvg = ySum / NUM_CIRCLES;

    let xDelt = canvasCenterX - xAvg;
    let yDelt = canvasCenterY - yAvg;

    for (let i = 0; i < NUM_CIRCLES; i++) {
      xPos.current[i] += xDelt;
      yPos.current[i] += yDelt;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const context = canvas?.getContext("2d");
    if (context) {
      let frameCount = 0;
      let animationFrameId: any;

      const render = () => {
        frameCount++;

        // console.log("in here");
        draw(context, frameCount);
        driftToCenter(context);
        update(frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw]);

  return (
    <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <canvas ref={canvasRef} width={300} height={300} />
    </div>
    
  );
};

export default Home;
