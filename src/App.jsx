import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
