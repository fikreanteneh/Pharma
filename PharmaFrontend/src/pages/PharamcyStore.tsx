import { Button } from "@mui/material";
import RegisterMedicine from "../components/RegisterMedicine";
import RegisterStock from "../components/RegisterStock";
import Spinner from "../components/Spinner";
import UseToggle from "../hooks/ToggleHook";
import useAuth from "../store/UseAuth";
import UseStore from "../store/UseStore";
import ItemCard from './../components/ItemCard';

const PharamcyStore = () => {
  const [stockOpen, setStockOpen] = UseToggle(false);
  const [medicineOpen, setMedicineOpen] = UseToggle(false);
  const { authState } = useAuth()
  const [pharmacymedicine, isLoading, isError] = UseStore(authState.currentUser?.user.id ?? "");





  return (
    <>
      <Button variant="outlined" color="primary" size="large" onClick={setStockOpen}> Add New Stock </Button>
      <Button variant="outlined" color="primary" size="large" onClick={setMedicineOpen}> Add New Medicine </Button>
      <RegisterStock open={stockOpen} handleToggle={setStockOpen} />
      <RegisterMedicine open={medicineOpen} handleToggle={setMedicineOpen} />
      <div>
        {isError && <div>Something went wrong ...</div>}
        {isLoading && <Spinner />}
        {
          pharmacymedicine?.map((pharmacymedicine) => {
            return (
              <div key={pharmacymedicine.id}>
                <ItemCard pharmacymedicine={pharmacymedicine} />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default PharamcyStore