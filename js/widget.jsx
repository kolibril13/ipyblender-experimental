import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import Button from "@mui/material/Button";

export const render = createRender(() => {
  const [label] = useModelState("label");
  let [count, setCount] = useModelState("count");
  let [base64Image, setBase64Image] = useModelState("base64Image");

  function handleClick() {
    console.log("button clicked");
    setCount(count + 1);
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        {" "}
        {label} {count}
      </Button>
      <Box sx={{ width: 300 }}>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="off"
        />
      </Box>
      <br />
      <img src={base64Image} alt="8x8 Transparent PNG" />
    </div>
  );
});
