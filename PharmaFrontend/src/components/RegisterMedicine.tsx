
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { ChangeEvent, useState } from 'react';
import { toast } from "react-toastify";
import * as yup from 'yup';
import useMedicine from "../state/store/useMedicine";
// import Spinner from "./Spinner";


type RegisterMedicineProp = {
    open: boolean;
    handleToggle: () => void;
}

const RegisterMedicine = (prop: RegisterMedicineProp) => {

    const { addMedicine, medicineState, resetFailed } = useMedicine();

    const [formData, setFormData] = useState({ "name": "", "amharicName": "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((oldData) => ({ ...oldData, [id]: value }))
    }

    const schema = yup.object().shape({

        name: yup.string().min(5, 'Minimum Length is %').required('Name is required'),
        amharicName: yup.string().min(5, 'Minimum Length is %').required('Amharic Name is required'),
    });


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        schema.validate(formData)
            .then(async () => {
                await addMedicine({
                    name: formData.name,
                    amharicName: formData.amharicName,

                })
            })
            .catch(err => {
                toast.error(err.message)
            })
    }
    if (medicineState.status == 'loading') return <CircularProgress />
    else if (medicineState.status == 'failed') {
        toast.error(medicineState.error[0])
        resetFailed()
    }

    return (
        <>
            <Dialog open={prop.open} onClose={prop.handleToggle}>

                <DialogTitle>Register a new Medicine</DialogTitle>

                <DialogContent>
                    <DialogContentText>Fill the neccessary options</DialogContentText>
                    <TextField onChange={handleChange} value={formData.name} autoFocus margin="dense" id="name" label="Name" placeholder="Amoxylin" type="text" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.amharicName} autoFocus margin="dense" id="amharicName" label="Amharic Name" placeholder="Amoxyxylin" type="text" fullWidth variant="standard" />
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