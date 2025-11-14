import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import TreeBitesMockup from "@/components/mockup";

createRoot(document.getElementById("root")!).render(<App />);

export default function AppDemo() {
    return <TreeBitesMockup />;
  }
  