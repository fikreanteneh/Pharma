import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Body } from '../../styles'
import PharmacyHeader from '../components/PharmacyHeader'

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