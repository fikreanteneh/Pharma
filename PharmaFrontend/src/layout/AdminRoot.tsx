import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Body } from '../../styles'
import AdminHeader from '../components/AdminHeader'

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