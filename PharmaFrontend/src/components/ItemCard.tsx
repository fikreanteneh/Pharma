import { Box, Button, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { handleUpdateRequest } from '../hooks/ReactQueryFetch'
import { PharmacyMedicine } from '../models/PharamcyMedicine'
import PharmacyMedicineRepository from '../repositories/PharmacyMedicineRepository';

type ItemCardProp = {
  pharmacymedicine: PharmacyMedicine
}
const ItemCard = (props: ItemCardProp) => {
  const queryClient = useQueryClient();
  const updateParmacyMedicine = useMutation(
    (updatedPharamcyMedicine: PharmacyMedicine) => {
      return handleUpdateRequest(() =>
        PharmacyMedicineRepository.updatePharamcyMedicine(updatedPharamcyMedicine)
      );
    }, {
    onSuccess: (_, updatedPharamcyMedicine) => {
      queryClient.setQueryData<PharmacyMedicine[]>(['PharmacyMedicine'], (prevData) => {
        const updatedData = prevData
          ? prevData.map((pharmacyMedicine: PharmacyMedicine) =>
            pharmacyMedicine.id === updatedPharamcyMedicine.id ? updatedPharamcyMedicine : pharmacyMedicine)
          : prevData
        return updatedData;
      });
    },
  }
  );


  const pharmacymedicine = props.pharmacymedicine
  const [formData, setFormData] = useState({ id: props.pharmacymedicine.id, "price": props.pharmacymedicine.price, "quantity": props.pharmacymedicine.quantity })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    updateParmacyMedicine.mutate(
      {
        id: formData.id,
        medicineid: pharmacymedicine.medicineid,
        pharmacyid: pharmacymedicine.pharmacyid,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        medicine: pharmacymedicine.medicine
      }
    )
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>{`${pharmacymedicine.medicine?.name} | ${pharmacymedicine.medicine?.exactname} | ${pharmacymedicine.medicine?.amount}mg`}</h1>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Price:</h2>
        <TextField id="price" type="number" onChange={handleChange} value={formData.price} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <h1>+</h1>
        <TextField id="quantity" type="number" onChange={handleChange} value={formData.quantity} />
        <h1>-</h1>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        disabled={!(pharmacymedicine.price != formData.price || pharmacymedicine.quantity != formData.quantity)}>
        Update</Button>

    </Box>
  )
}

export default ItemCard