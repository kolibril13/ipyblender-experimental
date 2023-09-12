import { createRender, useModelState } from "@anywidget/react";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

function BlenderModel(props) {
  const ref = useRef();
  const [clicked, click] = useState(false);
  const jsonStr = props.torusModelUrl;
  const [gltfModel, setGltfModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.parse(jsonStr, "", (result) => {
      setGltfModel(result);
    });
  }, [jsonStr]);

  const scaleValue = clicked ? 1.5 : 1;

  if (!gltfModel) return null;

  return (
    <primitive
      object={gltfModel.scene}
      ref={ref}
      scale={[scaleValue, scaleValue, scaleValue]}
      {...props}
      onClick={(event) => click(!clicked)}
    />
  );
}

export const render = createRender(() => {
  const [torusname] = useModelState("torusname");

  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[1, 0, 1]} />
        <Suspense fallback={null}>
          <BlenderModel position={[2, -2, -2]} torusModelUrl={torusname} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
});
