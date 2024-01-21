import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- default behaviour
createRoot(document.getElementById("root")!).render(<App />);
