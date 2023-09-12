import { createRender, useModelState } from "@anywidget/react";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";

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

  if (!gltfModel) return null;
  return (
    <group position={[1, -2, 2]} rotation={[1, 1, 0]}>
      <primitive object={gltfModel.scene} ref={ref} {...props} />
    </group>
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
        <perspectiveCamera position={[1, -3, 4]} />
      </Canvas>
    </div>
  );
});
