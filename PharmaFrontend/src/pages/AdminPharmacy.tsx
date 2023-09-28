
import { Button } from "@mui/material"
import RegisterPharmacy from "../components/RegisterPharmacy";
import UseToggle from "../hooks/ToggleHook";
// import RegisterPharmacy from './../components/RegisterPharmacy';


const AdminPharmacy = () => {
  const [open, setOpen] = UseToggle(false);
  return (
    <>
      <Button variant="outlined" color="primary" size="large" onClick={setOpen}>Add Pharamacy</Button>
      <div>AdminPharmacy</div>
      <RegisterPharmacy open={open} handleToggle={setOpen} />
    </>
  )
}

export default AdminPharmacy