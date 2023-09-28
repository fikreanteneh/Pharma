
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useState } from 'react';
import { toast } from "react-toastify";
import * as yup from 'yup';
import useAdminPharmacy from "../state/store/useAdminPharmacy";
// import Spinner from "./Spinner";


type RegisterPharmacyProp = {
    open: boolean;
    handleToggle: () => void;
}

const RegisterPharmacy = (prop: RegisterPharmacyProp) => {

    const { addPharmacy, pharmacyState, resetFailed } = useAdminPharmacy();

    const [formData, setFormData] = useState({ "email": "", "password": "", "name": "", "lattitude": 10, "longitude": 40, "cemail": "", "cphoneNumber": "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((oldData) => ({ ...oldData, [id]: value }))
    }

    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(4, 'Password must be at least 8 characters').required('Password is required'),
        name: yup.string().min(5, 'Minimum Length is %').required('Name is required'),
        lattitude: yup.number().min(3, 'Minimum Lattitude is 3').max(15, 'Maximum Lattitude is 15').required('Lattitude is required'),
        longitude: yup.number().min(33, 'Minimum Longitude is 33').max(50, 'Maximum Longitude is 50').required('Longitude is required'),
        cemail: yup.string().email('Invalid Contact email').required('Email is required'),
        cphoneNumber: yup.string().min(9, 'Minimum Length is 9').max(9, 'Maximum Length is 9').required('Phone Number is required'),
    });


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        schema.validate(formData)
            .then(async () => {
                await addPharmacy({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    address: {
                        lattitude: formData.lattitude,
                        longitude: formData.longitude,
                    },
                    phoneNumbers: [formData.cphoneNumber],
                    emails: [formData.cemail]
                })
            })
            .catch(err => {
                toast.error(err.message)
            })
    }
    if (pharmacyState.status == 'loading') return <CircularProgress />
    else if (pharmacyState.status == 'failed') {
        toast.error(pharmacyState.error)
        resetFailed()
    }

    return (
        <>
            <Dialog open={prop.open} onClose={prop.handleToggle}>

                <DialogTitle>Register a new Pharamcy</DialogTitle>

                <DialogContent>
                    <DialogContentText>Fill the neccessary options</DialogContentText>
                    <TextField onChange={handleChange} value={formData.name} autoFocus margin="dense" id="name" label="Name" placeholder="Ethiopia Pharamcy Branch 1" type="text" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.email} autoFocus margin="dense" id="email" label="E - Mail" placeholder="ethiopia@gmail.com" type="email" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.password} autoFocus margin="dense" id="password" label="Password" type="password" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.lattitude} autoFocus margin="dense" id="lattitude" placeholder="13.7896" label="Address Lattitude" type="text" variant="standard" />
                    <TextField onChange={handleChange} value={formData.longitude} autoFocus margin="dense" id="longitude" placeholder="30.6788" label="Address Longitude" type="text" variant="standard" />
                    <TextField onChange={handleChange} value={formData.cemail} autoFocus margin="dense" id="cemail" label="Contact E-mail" placeholder="ethiopia@gmail.com" type="email" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.cphoneNumber} autoFocus margin="dense" id="cphoneNumber" label="Contact PhoneNumber" placeholder="940229161" type="text" fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={prop.handleToggle}>Cancel</Button>
                    <Button onClick={handleSubmit}>Register</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RegisterPharmacy