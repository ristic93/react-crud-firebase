import { Routes, Route } from "react-router-dom";
import { AddEdit, Home } from "./pages";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/add" element={<AddEdit/>} />
        <Route exact path="/update/:id" element={<AddEdit/>} />
      </Routes>
    </div>
  );
}

export default App;
