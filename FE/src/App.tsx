import AllUsers from "./pages/AllUsers";
import GetUserById from "./pages/GetUserById";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/getAllUsers" element={<AllUsers />} />
        <Route path="/getUser" element={<GetUserById />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
