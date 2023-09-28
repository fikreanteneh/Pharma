import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LandingRoot from "./layout/LandingRoot";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import RouteProtection from "./components/RouteProtection";
import PharmacyRoot from "./layout/PharmacyRoot";
import AdminRoot from "./layout/AdminRoot";
import PharamcyStore from "./pages/PharamcyStore";
import PharamcyProfile from "./pages/PharamcyProfile";
import AdminMedicine from "./pages/AdminMedicine";
import AdminPharmacy from "./pages/AdminPharmacy";
import AdminManagment from "./pages/AdminManagment";
import AdminProfile from "./pages/AdminProfile";
import CustomerMedicine from "./pages/CustomerMedicine";
import CutomerPharmacy from "./pages/CutomerPharmacy";
import CustomerMedicineDetail from "./pages/CustomerMedicineDetail";
import CustomerPharmacyDetail from "./pages/CustomerPharmacyDetail";



const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingRoot />}>
        <Route index element={<LandingPage />} />
        <Route path='medicines' element={<CustomerMedicine />}>
          <Route path=':id' element={<CustomerMedicineDetail />} />
        </Route>
        <Route path='pharmacies' element={<CutomerPharmacy />}>
          <Route path=':id' element={<CustomerPharmacyDetail />} />
        </Route>
        <Route path='about' element={<CutomerPharmacy />} />
        <Route path='contact' element={<CutomerPharmacy />} />
        <Route element={<RouteProtection routeType={""} />}>
          <Route path='signin' element={<Signin />} />
        </Route>
      </Route>

      <Route path='/pharmacy' element={<PharmacyRoot />} >
        <Route element={<RouteProtection routeType={"pharmacy"} />}>
          <Route index element={<PharamcyStore />} />
          <Route path="profile" element={<PharamcyProfile />} />
        </Route>
      </Route>

      <Route element={<RouteProtection routeType={"admin"} />}>
        <Route path='/admin' element={<AdminRoot />} >
          <Route index element={<AdminMedicine />} />
          <Route path='pharmacy' element={<AdminPharmacy />} />
          <Route path='managment' element={<AdminManagment />} />
          <Route path='profile' element={<AdminProfile />} />
        </Route>
      </Route>

      {/* <Route path='*' element={<WrongRoute/>}/> */}

    </>
  )
)


export default Router;