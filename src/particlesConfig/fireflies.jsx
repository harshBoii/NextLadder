// src/particlesConfig/fireflies.js
export const fireflyOptions = {
  fullScreen: {
    enable: false, // we’ll size it manually via CSS
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: "#fffcc0", // a soft yellowish-white
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.3, max: 0.8 },
      animation: {
        enable: true,
        speed: 1.2,
        minimumValue: 0.3,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 },
      random: true,
      animation: {
        enable: false,
      },
    },
    move: {
      enable: true,
      speed: 0.2,           // very slow drift
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    links: {
      enable: false,        // no lines between fireflies
    },
  },
  detectRetina: true,
};
