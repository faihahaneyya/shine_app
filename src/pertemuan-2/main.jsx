// src/pertemuan-2/main.jsx
import { createRoot } from "react-dom/client";
import BioData from "./BioData";
import Container from "./Container";
import "./custom.css";

// Mencari element dengan ID 'root' di HTML dan merender komponen Container
createRoot(document.getElementById("root")).render(
  <div className="card">
    <Container>
      <BioData />
    </Container>
  </div>
);