import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import { Body } from "../styles";



export const LandingRoot = () => {

  return (
    <Body>
      <Header />
      <Outlet />
      <ToastContainer autoClose={1500} closeOnClick />
    </Body>

  )
}

export default LandingRoot;
