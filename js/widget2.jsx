import { createRender, useModelState } from "@anywidget/react";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "@react-three/drei";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

extend({ OrbitControls });

function BlenderModel(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const jsonStr = props.torusModelUrl;
  const [gltfModel, setGltfModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.parse(jsonStr, "", (result) => {
      setGltfModel(result);
    });
  }, []);

  const scaleValue = clicked ? 1.5 : 1;

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  if (!gltfModel) return null;

  return (
    <primitive
      object={gltfModel.scene}
      ref={ref}
      scale={[scaleValue, scaleValue, scaleValue]}
      {...props}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    />
  );
}

export const render = createRender(() => {
  const [label] = useModelState("label");
  let [count, setCount] = useModelState("count");
  let [svalue, setSvalue] = useModelState("svalue");
  let [base64Image, setBase64Image] = useModelState("base64Image");
  let [torusname, setTorusname] = useModelState("torusname");

  function handleClick() {
    console.log("button clicked");
    setCount(count + 1);
  }

  function handleSliderChange(event, newValue) {
    setSvalue(newValue);
  }

  return (
    <div>
      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ backgroundColor: "limegreen" }}
        >
          {label} {count}
        </Button>
        <Box sx={{ width: 300 }}>
          <Slider
            value={svalue}
            onChange={handleSliderChange}
            aria-label="Default"
            valueLabelDisplay="off"
            sx={{
              color: "limegreen",
              "& .MuiSlider-track": {
                backgroundColor: "limegreen",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "lightgrey",
              },
              "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(76, 175, 80, 0.16)", // Changes the surrounding circle color to Green on hover and focus
              },
            }}
          />
        </Box>
      </Box>
      <br />
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <BlenderModel position={[-3, -2, 0]} torusModelUrl={torusname} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <img src={base64Image} alt="8x8 Transparent PNG" />
    </div>
  );
});
