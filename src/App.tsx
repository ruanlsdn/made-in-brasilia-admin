import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Modal, Sidebar, Topbar } from "./components";
import { useStateContext } from "./contexts/StateContext";
import { Cities, Welcome } from "./pages";

function App() {
  const { isSidebarActive } = useStateContext();

  return (
    <div className="App">
      {isSidebarActive && <Sidebar />}
      <div className="App-content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/places" element={<Welcome />} />
          <Route path="/pendent" element={<Welcome />} />
        </Routes>
      </div>
      <Modal />
    </div>
  );
}

export default App;
