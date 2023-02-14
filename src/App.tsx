import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar, Topbar } from "./components";
import { useApplicationControlContext } from "./contexts/ApplicationControlContext";
import { Cities, PendingPosts, Posts, Users, Welcome } from "./pages";

function App() {
  const { isSidebarActive } = useApplicationControlContext();

  return (
    <div className="App">
      {isSidebarActive && <Sidebar />}
      <div className="App-content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/pending-posts" element={<PendingPosts />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
