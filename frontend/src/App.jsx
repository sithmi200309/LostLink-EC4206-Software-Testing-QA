import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrowseItems from "./pages/BrowseItems";
import ItemDetails from "./pages/ItemDetails";
import ReportItem from "./pages/ReportItem";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/browse" element={<BrowseItems />} />

        <Route path="/report" element={<ReportItem />} />
        
        <Route path="/login" element={<Login />} />
        

        <Route path="/register" element={<Register />} />

        <Route path="/items/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;