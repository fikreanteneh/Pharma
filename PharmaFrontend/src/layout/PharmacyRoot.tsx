import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PharmacyHeader from '../components/PharmacyHeader'
import { Body } from '../styles'

const PharmacyRoot = () => {
    return (
        <div>
            <Body>
                <PharmacyHeader />
                <Outlet />
                <ToastContainer autoClose={1500} closeOnClick />
            </Body>
        </div>
    )
}

export default PharmacyRoot