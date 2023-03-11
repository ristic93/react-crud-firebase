import { Routes, Route } from "react-router-dom";
import { Employees } from "./pages";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path="/" element={<Employees/>} />
        <Route exact path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
