import { Button } from '@mui/material';
import RegisterMedicine from '../components/RegisterMedicine';
import UseToggle from '../hooks/ToggleHook';

const AdminMedicine = () => {
  const [open, setOpen] = UseToggle(false);
  return (
    <>
      <Button variant="outlined" color="primary" size="large" onClick={setOpen}>Add Medicine</Button>
      <RegisterMedicine open={open} handleToggle={setOpen} />
    </>
  )
}

export default AdminMedicine