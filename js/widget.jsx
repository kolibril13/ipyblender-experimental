import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      light: "#D3D3D3", // Light gray in hex
      main: "#FFA500", // Orange in hex
      dark: "#FF8C00", // Dark orange in hex
      contrastText: "#FFFFFF", // White in hex
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <div>
        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            {label} {count}
          </Button>
          <Box sx={{ width: 300 }}>
            <Slider
              value={svalue}
              onChange={handleSliderChange}
              aria-label="Default"
              valueLabelDisplay="off"
              color="primary"
              sx={{
                ".MuiSlider-rail": {
                  backgroundColor: "lightgrey",
                },
              }}
            />
          </Box>
        </Box>
        <br />
        <img src={base64Image} alt="8x8 Transparent PNG" />
      </div>
    </ThemeProvider>
  );
});
