import { Navigate, Outlet } from "react-router-dom"
import Spinner from "./Spinner"
import { toast } from "react-toastify"
import useAuth from "../state/store/useAuth"

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