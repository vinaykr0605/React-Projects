import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App message="Hello React" />);
