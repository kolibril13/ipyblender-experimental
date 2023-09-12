import { createRender, useModelState } from "@anywidget/react";
import React, { useRef, useState, Suspense } from "react";
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

  const jsonStr = `{
    "asset":{
      "generator":"Khronos glTF Blender I/O v3.6.27",
      "version":"2.0"
    },
    "scene":0,
    "scenes":[
      {
        "name":"Scene",
        "nodes":[
          0
        ]
      }
    ],
    "nodes":[
      {
        "mesh":0,
        "name":"Cube",
        "translation":[
          0,
          1,
          -1
        ]
      }
    ],
    "materials":[
      {
        "doubleSided":true,
        "name":"BlueMaterial",
        "pbrMetallicRoughness":{
          "baseColorFactor":[
            0,
            0,
            1,
            1
          ],
          "metallicFactor":0,
          "roughnessFactor":0.5
        }
      }
    ],
    "meshes":[
      {
        "name":"Cube.001",
        "primitives":[
          {
            "attributes":{
              "POSITION":0,
              "NORMAL":1,
              "TEXCOORD_0":2
            },
            "indices":3,
            "material":0
          }
        ]
      }
    ],
    "accessors":[
      {
        "bufferView":0,
        "componentType":5126,
        "count":24,
        "max":[
          1,
          1,
          1
        ],
        "min":[
          -1,
          -1,
          -1
        ],
        "type":"VEC3"
      },
      {
        "bufferView":1,
        "componentType":5126,
        "count":24,
        "type":"VEC3"
      },
      {
        "bufferView":2,
        "componentType":5126,
        "count":24,
        "type":"VEC2"
      },
      {
        "bufferView":3,
        "componentType":5123,
        "count":36,
        "type":"SCALAR"
      }
    ],
    "bufferViews":[
      {
        "buffer":0,
        "byteLength":288,
        "byteOffset":0,
        "target":34962
      },
      {
        "buffer":0,
        "byteLength":288,
        "byteOffset":288,
        "target":34962
      },
      {
        "buffer":0,
        "byteLength":192,
        "byteOffset":576,
        "target":34962
      },
      {
        "buffer":0,
        "byteLength":72,
        "byteOffset":768,
        "target":34963
      }
    ],
    "buffers":[
      {
        "byteLength":840,
        "uri":"data:application/octet-stream;base64,AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AACAvwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAAAAAgD8AAACAAACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAvwAAAAAAAACAAAAAAAAAAAAAAIC/AAAAAAAAgD8AAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AACAPwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAAAAAgD8AAACAAACAPwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAPwAAAAAAAACAAAAAAAAAAAAAAIC/AAAAAAAAgD8AAACAAACAPwAAAAAAAACAAADAPgAAgD8AAAA+AACAPgAAwD4AAAAAAAAgPwAAgD8AACA/AAAAAAAAYD8AAIA+AADAPgAAQD8AAAA+AAAAPwAAwD4AAEA/AAAgPwAAQD8AACA/AABAPwAAYD8AAAA/AADAPgAAgD4AAMA+AACAPgAAwD4AAIA+AAAgPwAAgD4AACA/AACAPgAAID8AAIA+AADAPgAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAAD8AACA/AAAAPwAAID8AAAA/AAADAAkAAAAJAAYACAAKABUACAAVABMAFAAXABEAFAARAA4ADQAPAAQADQAEAAIABwASAAwABwAMAAEAFgALAAUAFgAFABAA"
      }
    ]
  }
  `;
  const torusModelUrl = "./cube_model.gltf";
  const gltf = useLoader(GLTFLoader, torusModelUrl);

  const scaleValue = clicked ? 1.5 : 1;

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <primitive
      object={gltf.scene}
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
