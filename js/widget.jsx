import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";

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
      <button onClick={handleClick}>
        {label} {count}
        <br />
      </button>
      {count == 0 && <> 👈 Click to change color</>}
      <br />
      <img src={base64Image} alt="8x8 Transparent PNG" />
    </div>
  );
});
