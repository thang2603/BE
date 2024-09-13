import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Vong1 from "./components/vong_1/Vong1";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Control1 from "./components/vong_1/Control1";
import VongGroup1 from "./components/vong_1/VongGroup1";
import Vong2 from "./components/vong_2/Vong2";
import Control2 from "./components/vong_2/Control2";
import ControlGroup from "./components/vong_1/ControlGroup";
import Vong3 from "./components/vong_3/Vong3";
import Control3 from "./components/vong_3/Control3";
import Vong4 from "./components/vong_4/Vong4";
import Control4 from "./components/vong_4/Control4";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PageQuestion from "./components/CreateQuestion/PageQuestion";

function App() {
  const { user } = useContext(UserContext);
  return (
    <DefaultLayout>
      <div></div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="create" element={<PageQuestion />}></Route>
        <Route path="vong/1">
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Control1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Vong1 />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="vong-group/1">
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <ControlGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <VongGroup1 />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="vong/2">
          <Route
            path="user"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Vong2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Control2 />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="vong/3">
          <Route
            path="user"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Vong3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Control3 />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="vong/4">
          <Route
            path="user"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Vong4 />
              </ProtectedRoute>
            }
          />
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Control4 />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
