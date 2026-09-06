"use client";

import React from "react";
import { GrainGradient } from "@paper-design/shaders-react";

export default function GrainGradientShader() {
  return (
    <GrainGradient
      speed={0.75}
      scale={1}
      rotation={0}
      offsetX={0}
      offsetY={0}
      softness={0.55}
      intensity={0.5}
      noise={0.22}
      shape="corners"
      frame={2854.5}
      colors={["#FFFFFF", "#71717A", "#27272A", "#FFFFFF"]}
      colorBack="#00000000"
      className="absolute inset-0 bg-black"
    />
  );
}
