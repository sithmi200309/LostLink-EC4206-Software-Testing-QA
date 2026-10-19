import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BrowseItems from "./pages/BrowseItems";
import ItemDetails from "./pages/ItemDetails";
import ReportItem from "./pages/ReportItem";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/browse" element={<BrowseItems />} />

        <Route path="/report" element={<ReportItem />} />

        <Route
          path="/login"
          element={
            <main className="page-content">
              <h1>Log in</h1>
            </main>
          }
        />

        <Route
          path="/register"
          element={
            <main className="page-content">
              <h1>Create an Account</h1>
            </main>
          }
        />

        <Route path="/items/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;