
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrowseItems from "./pages/BrowseItems";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";
import ReportItem from "./pages/ReportItem";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import MyReports from "./pages/MyReports";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/browse" element={<BrowseItems />} />

        <Route path="/report" element={<ReportItem />} />

        <Route path="/my-reports" element={<MyReports />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/items/:id" element={<ItemDetails />} />

        <Route
          path="/items/:id/edit"
          element={<EditItem />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
