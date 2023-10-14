import { Button } from '@mui/material';
import RegisterMedicine from '../components/RegisterMedicine';
import Spinner from '../components/Spinner';
import UsePage from '../hooks/PageHook';
import UseToggle from '../hooks/ToggleHook';
import UseMedicine from '../store/UseMedicine';
import MedicineCard from './../components/MedicineCard';

const AdminMedicine = () => {
  const [pageNumber, changePageNumber, pageSize, changePageSize] = UsePage(0, 15);
  const [open, setOpen] = UseToggle(false);
  const [data, isLoading, isError] = UseMedicine(pageNumber, pageSize);

  return (
    <>
      <Button variant="outlined" color="primary" size="large" onClick={setOpen}>Add Medicine</Button>
      <RegisterMedicine open={open} handleToggle={setOpen} />
      {isLoading && <Spinner />}
      {!isError && !isLoading && <div>
        {data?.map((medicine) => {
          return <MedicineCard medicine={medicine} />
        })}
        <Button disabled={pageNumber == 0} onClick={() => { changePageNumber(pageNumber - 1) }} >Back</Button>
        <Button disabled={data?.length != pageSize} onClick={() => {
          changePageNumber(pageNumber + 1)
        }}>Next</Button>
      </div>}

    </>
  )
}

export default AdminMedicine