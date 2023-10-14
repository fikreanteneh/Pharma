import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../store/UseAuth"
import Spinner from "./Spinner"

type PrivateRouteProp = {
  routeType: "" | "pharmacy" | "admin"
}

const RouteProtection: React.FC<PrivateRouteProp> = ({ routeType }) => {

  const { authState } = useAuth()

  if (authState.status == "loading") {
    return <Spinner />
  }



  return authState.userRole == routeType ? <Outlet /> : <Navigate to={`/${authState.userRole}`} />

}
export default RouteProtection