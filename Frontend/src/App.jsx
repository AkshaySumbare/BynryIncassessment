import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserData } from "./pages/UserData";
import { Header } from "./component/Header";
import { Extradetails } from "./pages/Extradetails";
import { Edit } from "./pages/Edit";
import {Location} from "./pages/Location"

function App() {
  return (
    <div className=" w-auto">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserData />} />
          <Route path="/users/:id/details" element={<Extradetails />} />
          <Route path="/users/:id/update" element={<Edit />} />
          <Route path="/users/:id/location" element={<Location/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
