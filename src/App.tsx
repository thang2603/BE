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

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="vong/1">
          <Route path="control" element={<Control1 />} />
          <Route path="user" element={<Vong1 />} />
        </Route>
        <Route path="vong-group/1">
          <Route path="control" element={<ControlGroup />} />
          <Route path="user" element={<VongGroup1 />} />
        </Route>
        <Route path="vong/2">
          <Route path="user" element={<Vong2 />} />
          <Route path="control" element={<Control2 />} />
        </Route>
      </Routes>
    </DefaultLayout>
  );
}

export default App;
