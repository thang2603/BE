import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Vong1 from "./components/vong_1/Vong1";
import DefaultLayout from "./components/Layout/DefaultLayout";
import Control1 from "./components/vong_1/Control1";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="vong/1">
          <Route path="control" element={<Control1 />} />
          <Route path="user" element={<Vong1 />} />
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
