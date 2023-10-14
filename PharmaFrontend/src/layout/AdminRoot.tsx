import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminHeader from '../components/AdminHeader'
import { Body } from '../styles'

const AdminRoot = () => {
    return (
        <div>
            <Body>
                <AdminHeader />
                <Outlet />
                <ToastContainer autoClose={1500} closeOnClick />
            </Body>
        </div>
    )
}

export default AdminRoot;