
import "moment/locale/es";

import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';
import { Navigation } from "../layouts/Navigation";
import { Footer } from "../layouts/Footer";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../states/store";

import { getAuthenticationToken } from "../connections/helpers/token";
import { PrivateRoute } from "./PrivateRoute";
import { ToastContainer } from "react-toastify";

import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Error404 } from "../pages/Error404";

import { UserList } from "../pages/user/UserList";

import { TableTask } from "../pages/task/UserTableTask";

import { ProjectList } from "../pages/project/ProjectList";
import { ProjectDetail } from "../pages/project/ProjectDetail";

import { TaskEdit } from "../pages/task/TaskEdit";


import '../css/style.css';
import { ChangePassword } from "../pages/auth/ChangePassword";

getAuthenticationToken();

const App = () => {
  return (
    <Provider store={store}>
      {/* <Navigation /> */}
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route
            element={
              <>
                <Navigation/>
                <Outlet />
              </>
            }
          >
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<ProjectList />} />
              <Route path="/user" element={<UserList />} />
              {/* <Route path="/user/create" element={<UserCreate />} /> */}
              <Route path="/project/detail" element={<ProjectDetail />}/>
              <Route path="/table/task/:identificator" element={<TableTask />}/>
              <Route path="/table/task/:identificator/taskEdit/:taskId" element={<TaskEdit/>}/>
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
