
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Medicine } from '../models/Medicine';
import { PharmacyMedicine } from '../models/PharamcyMedicine';
import useAuth from '../store/UseAuth';
import UseMedicineSearch from '../store/UseMedicineSearch';
import PharmacyMedicineRepository from '../repositories/PharmacyMedicineRepository';


type RegisterStockProp = {
    open: boolean;
    handleToggle: () => void;
}
const RegisterStock = (prop: RegisterStockProp) => {

    const { authState } = useAuth()
    const [search, setSearch, medicines, fetchNextPage, isFetchingNextPage, status, hasNextPage] = UseMedicineSearch();

    const [formData, setFormData] = useState<PharmacyMedicine>({ "medicineid": "", "pharmacyid": authState.currentUser?.user.id, "price": 0, "quantity": 0 })

    const schema = yup.object().shape({
        medicineid: yup.string().length(36).required('Medicine is required'),
        pharmacyid: yup.string().length(36).required('Pharmacy is required'),
        price: yup.number().min(0, 'Minimum Price is 0').required('Price is required'),
        quantity: yup.number().integer().min(0, 'Minimum Quantity is 0').required('Quantity is required'),
    });

    // const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    //     // const target = event.target as HTMLDivElement;
    //     // if (target.scrollTop + target.clientHeight === target.scrollHeight && hasNextPage) fetchNextPage();
    // };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((oldData) => ({ ...oldData, [id]: value }))
    }

    const handleMedicineChange = (e: SyntheticEvent<Element, Event>, value: Medicine | null) => {
        const id = value?.id ?? ""
        setFormData((oldData) => ({ ...oldData, medicineid: id }))
    }


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        schema.validate(formData)
            .then(async () => {
                console.log(formData)
                formData.price = parseFloat(formData.price.toString())
                formData.quantity = parseInt(formData.quantity.toString())
                const res = await PharmacyMedicineRepository.addPharmacyMedicine(formData)
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
                    <Autocomplete
                        // disablePortal
                        // onScroll={handleScroll}
                        id="drug"
                        // onMenuScrollToBottom={fetchNextPage}
                        options={medicines?.pages.flatMap(page => page) ?? []}
                        getOptionLabel={(medicine) => `${medicine.name} (${medicine.exactname}) - ${medicine.amount}mg`}
                        fullWidth
                        loading={status === "loading"}
                        onInputChange={(event, value) => setSearch(value)}
                        onChange={handleMedicineChange}
                        renderInput={(params) => <TextField {...params} label="Medicine" />}
                    />
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

export default RegisterStock;