import { Button } from "@mui/material"
import RegisterStock from "../components/RegisterStock";
import UseToggle from "../hooks/ToggleHook";
import RegisterMedicine from "../components/RegisterMedicine";

const PharamcyStore = () => {
  const [stockOpen, setStockOpen] = UseToggle(false);
  const [medicineOpen, setMedicineOpen] = UseToggle(false);
  return (
    <>
      <Button variant="outlined" color="primary" size="large" onClick={setStockOpen}> Add New Stock </Button>
      <Button variant="outlined" color="primary" size="large" onClick={setMedicineOpen}> Add New Medicine </Button>
      <div>AdminPharmacy</div>
      <RegisterStock open={stockOpen} handleToggle={setStockOpen} />
      <RegisterMedicine open={medicineOpen} handleToggle={setMedicineOpen} />
    </>
  )
}

export default PharamcyStore