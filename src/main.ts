import "./style.css";

import Worker from "./worker?worker";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");

if (canvas) {
  const offscreen = canvas.transferControlToOffscreen();

  const worker = new Worker();

  worker.postMessage(
    {
      type: "init",
      drawingSurface: offscreen,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      pixelRatio: window.devicePixelRatio,
    },
    [offscreen]
  );

  window.addEventListener(
    "resize",
    () => {
      worker.postMessage({
        type: "resize",
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
    false
  );

  const a = (e: MouseEvent) => {
    worker.postMessage({
      type: "updateCamera",
      x: e.movementX,
      y: e.movementY,
    });
  };

  function lockChangeAlert() {
    if (document.pointerLockElement === canvas) {
      console.log("The pointer lock status is now locked");
      document.addEventListener("mousemove", a, false);
    } else {
      console.log("The pointer lock status is now unlocked");
      document.removeEventListener("mousemove", a, false);
    }
  }

  document.addEventListener("pointerlockchange", lockChangeAlert, false);

  canvas.addEventListener("click", async () => {
    if (!document.pointerLockElement) {
      await canvas.requestPointerLock();
    }
  });
}
