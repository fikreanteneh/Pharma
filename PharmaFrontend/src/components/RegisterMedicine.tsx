
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, useState } from 'react';
import { toast } from "react-toastify";
import * as yup from 'yup';
// import Spinner from "./Spinner";
import MedicineRepository from '../repositories/MedicineRepository';


type RegisterMedicineProp = {
    open: boolean;
    handleToggle: () => void;
}

const RegisterMedicine = (prop: RegisterMedicineProp) => {

    // const { addMedicine, medicineState, resetFailed } = useMedicine();


    const [formData, setFormData] = useState({ "name": "", "exactname": "", "amount": 0 })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((oldData) => ({ ...oldData, [id]: value }))
    }

    const schema = yup.object().shape({

        name: yup.string().min(5, 'Minimum Length is %').required('Generic Name is required'),
        exactname: yup.string().min(5, 'Minimum Length is %').required('Full Name is required'),
        amount: yup.number().min(1, 'Minimum Length is %').required('Amount is required'),
    });


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        schema.validate(formData)
            .then(async () => {
                formData.amount = parseFloat(formData.amount.toString())
                const res = await MedicineRepository.addMedicine(formData)
                res.success ? toast.success("Registerd Successfully") : toast.error(res.error)
            })
            .catch(err => {
                toast.error(err.message)
            })
    }
    return (
        <>
            <Dialog open={prop.open} onClose={prop.handleToggle}>

                <DialogTitle>Register a new Medicine</DialogTitle>

                <DialogContent>
                    <DialogContentText>Fill the neccessary options</DialogContentText>
                    <TextField onChange={handleChange} value={formData.name} autoFocus margin="dense" id="name" label="Name" placeholder="Amoxylin" type="text" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.exactname} autoFocus margin="dense" id="exactname" label="Full Name" placeholder="Amoxyxylin" type="text" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.amount} autoFocus margin="dense" id="amount" label="Amount" placeholder="Amoxylin" type="number" fullWidth variant="standard" />
                </DialogContent>

                <DialogActions>
                    <Button onClick={prop.handleToggle}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default RegisterMedicine