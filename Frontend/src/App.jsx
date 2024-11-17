import "./App.css";
import { Location } from "./pages/Location";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserData } from "./pages/UserData";
import { Header } from "./component/Header";
import { Extradetails } from "./pages/Extradetails";
import { Edit } from "./pages/Edit";

function App() {
  return (
    <div className=" w-auto">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserData />} />
          <Route path="/location" element={<Location />} />
          <Route path="/users/:id/details" element={<Extradetails />} />
          <Route path="/users/:id/update" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
