import { createRoot } from "react-dom/client";
import { App } from "./App";
import './css/index.css'
import './css/pico.min.css'

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App />);
