import "./App.css";
import { Location } from "./pages/Location";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserData } from "./pages/UserData";
import { Header } from "./component/Header";
import { Extradetails } from "./pages/Extradetails";

function App() {
  return (
    <div className="bg-[#dedee1] w-auto">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserData />} />
          <Route path="/location" element={<Location />} />
          <Route path="/details" element={<Extradetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
