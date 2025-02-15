import { detectDeviceType } from "./deviceUtils";

function resetFontSize() {
  const clientWidth = parseInt(
    document.documentElement.clientWidth.toString(),
    10
  );

  let size = 0;
  if (detectDeviceType() === "desktop") {
    size = (document.documentElement.clientWidth / 1920) * 16;
    document.documentElement.style.fontSize = (size <= 14 ? 13 : size) + "px";
  } else {
    size = clientWidth;
    let fontSize = (size / 750) * 16;
    fontSize = fontSize * 2;
    document.documentElement.style.fontSize = fontSize + "px";
  }
}

export const remHandle = () => {
  resetFontSize();
  window.addEventListener("pageshow", resetFontSize);
  window.addEventListener("resize", resetFontSize);
};
