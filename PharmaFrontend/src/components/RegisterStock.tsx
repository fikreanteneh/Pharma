
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import useMedicine from '../state/store/useMedicine';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { searchMedicineRequest } from '../state/request/medicineRequest';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';


type RegisterStockProp = {
    open: boolean;
    handleToggle: () => void;
}
const RegisterStock = (prop: RegisterStockProp) => {

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const [name, setName] = useState("");

    // const medicineSearch = useQuery(
    //     ["Medicines", { pageNumber }, pageSize, name],
    //     () => searchMedicineRequest(pageNumber, pageSize, name)
    // );

    const medicineSearch = useInfiniteQuery(
        ["Medicines", name],
        ({ pageParam }) => searchMedicineRequest(pageParam, pageSize, name),
        {
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = lastPage.page + 1;
                if (nextPage * pageSize < lastPage.message?.totalCount) {
                    return nextPage;
                }
                return undefined; // No more pages to fetch
            },
        }
    );

    const { medicineState, resetFailed } = useMedicine();

    const [formData, setFormData] = useState({ "name": "", "amharicName": "", "price": 0, "quantity": 0 })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((oldData) => ({ ...oldData, [id]: value }))
    }

    const schema = yup.object().shape({
        name: yup.string().min(5, 'Minimum Length is %').required('Name is required'),
        amharicName: yup.string().min(5, 'Minimum Length is %').required('Amharic Name is required'),
        price: yup.number().min(0, 'Minimum Price is 0').required('Price is required'),
        quantity: yup.number().integer().min(0, 'Minimum Quantity is 0').required('Quantity is required'),
    });


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        schema.validate(formData)
            .then(async () => {
                // await RegisterStock({
                //     name: formData.name,
                //     amharicName: formData.amharicName,

                // })
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
                    <TextField onChange={handleChange} value={formData.price} autoFocus margin="dense" id="price" label="Price" placeholder="12.5" type="number" fullWidth variant="standard" />
                    <TextField onChange={handleChange} value={formData.quantity} autoFocus margin="dense" id="quantity" label="Quantity" placeholder="25" type="number" fullWidth variant="standard" />

                </DialogContent>

                <DialogActions>
                    <Button onClick={prop.handleToggle}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default RegisterStock