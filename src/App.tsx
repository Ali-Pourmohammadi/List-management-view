import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./features/List/pages/Home";
import ListItems from "./features/List/pages/ListItems";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<ListItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
