"use client";

import { RotateLoader } from "react-spinners";

const css = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <RotateLoader
      color="dodgerblue"
      cssOverride={css}
      size={175}
      aria-label="Spinner"
    />
  );
};

export default LoadingPage;
