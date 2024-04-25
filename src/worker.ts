import Three from "./init";

let three: Three | null = null;

self.onmessage = function (message) {
  const data = message.data;

  if (data.type === "init") {
    three = new Three(
      data.drawingSurface,
      data.width,
      data.height,
      data.pixelRatio
    );
  }

  if (data.type === "resize") {
    three?.onWindowResize(data.width, data.height);
  }

  if (data.type === "updateCamera") {
    three?.updateCameraRotation(data.x, data.y);
  }
};
