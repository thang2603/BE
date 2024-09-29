import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
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
import Question1 from "./components/CreateQuestion/Question1";
import Question2 from "./components/CreateQuestion/Question2";
import Question3 from "./components/CreateQuestion/Question3";
import Question4 from "./components/CreateQuestion/Question4";
import CreateUser from "./components/CreateQuestion/CreateUser";
import QuestionGroup1 from "./components/CreateQuestion/QuestionGroup1";
import WaitScreen from "./components/common/WaitScreen";
import Vong5 from "./components/vong5/Vong5";
import LuckyWheel from "./components/vong5/LuckyWheel";
import Control5 from "./components/vong5/Control5";
import Question5 from "./components/CreateQuestion/Question5";

function App() {
  const { user } = useContext(UserContext);
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="wait-screen" element={<WaitScreen />} />
        <Route
          path="createUser"
          element={
            <PageQuestion>
              <CreateUser />
            </PageQuestion>
          }
        ></Route>
        <Route path="create">
          <Route
            path="1"
            element={
              <PageQuestion>
                <Question1 />
              </PageQuestion>
            }
          ></Route>
          <Route
            path="group/1"
            element={
              <PageQuestion>
                <QuestionGroup1 />
              </PageQuestion>
            }
          ></Route>
          <Route
            path="2"
            element={
              <PageQuestion>
                <Question2 />
              </PageQuestion>
            }
          ></Route>
          <Route
            path="3"
            element={
              <PageQuestion>
                <Question3 />
              </PageQuestion>
            }
          ></Route>
          <Route
            path="4"
            element={
              <PageQuestion>
                <Question4 />
              </PageQuestion>
            }
          ></Route>
          <Route
            path="5"
            element={
              <PageQuestion>
                <Question5 />
              </PageQuestion>
            }
          ></Route>
        </Route>
        <Route path="vong/1">
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <PageQuestion>
                  <Control1 />
                </PageQuestion>
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
                <PageQuestion>
                  <ControlGroup />
                </PageQuestion>
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
                <PageQuestion>
                  <Control2 />
                </PageQuestion>
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
                <PageQuestion>
                  <Control3 />
                </PageQuestion>
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
                <PageQuestion>
                  <Control4 />
                </PageQuestion>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="vong/5">
          <Route
            path="user"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <Vong5 />
              </ProtectedRoute>
            }
          />
          <Route
            path="control"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <PageQuestion>
                  <Control5 />
                </PageQuestion>
              </ProtectedRoute>
            }
          />
          <Route
            path="random"
            element={
              <ProtectedRoute isAuth={user?.id}>
                <LuckyWheel />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
