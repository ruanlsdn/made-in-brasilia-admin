import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedLayout, Sidebar, Topbar } from "./components";
import { useApplicationControlContext } from "./contexts/ApplicationControlContext";
import { useAuthControlContext } from "./contexts/AuthControlContext";
import { Cities, PendingPosts, Posts, Users, Welcome } from "./pages";
import Login from "./pages/login/Login";

function App() {
  const { isSidebarActive } = useApplicationControlContext();
  const { currentUser } = useAuthControlContext();

  return (
    <div className="App">
      {isSidebarActive && currentUser && <Sidebar />}
      <div className="App-content">
        {currentUser && <Topbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedLayout>
                <Welcome />
              </ProtectedLayout>
            }
          />
          <Route
            path="/cities"
            element={
              <ProtectedLayout>
                <Cities />
              </ProtectedLayout>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedLayout>
                <Posts />
              </ProtectedLayout>
            }
          />
          <Route
            path="/pending-posts"
            element={
              <ProtectedLayout>
                <PendingPosts />
              </ProtectedLayout>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedLayout>
                <Users />
              </ProtectedLayout>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
