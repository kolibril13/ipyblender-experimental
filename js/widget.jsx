import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

export const render = createRender(() => {
  const [label] = useModelState("label");
  let [count, setCount] = useModelState("count");
  let [svalue, setSvalue] = useModelState("svalue");
  let [base64Image, setBase64Image] = useModelState("base64Image");

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
          style={{ backgroundColor: "orange" }}
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
              color: "orange",
              "& .MuiSlider-track": {
                backgroundColor: "orange",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "lightgrey",
              },
              "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(255,165,0,0.16)", // Changes the surrounding circle color to orange on hover and focus
              },
            }}
          />
        </Box>
      </Box>
      <br />
      <img src={base64Image} alt="8x8 Transparent PNG" />
    </div>
  );
});
