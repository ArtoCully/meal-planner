import React from "react";

const useComponentToggle = () => {
  const [on, setToggle] = React.useState(false);
  const toggle = () => {
    setToggle(!on);
  }

  return {
    on,
    setToggle,
    toggle
  }
}

export default useComponentToggle;
