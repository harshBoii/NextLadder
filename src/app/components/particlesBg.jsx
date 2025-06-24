import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "../../config/particlesConfig";

const ParticlesBackground = () => {
  return <Particles id="tsparticles" options={particlesConfig} />;
};

export default ParticlesBackground;
