import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/users/pages/Home";
import UserListPage from "./features/users/pages/ListItems";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
