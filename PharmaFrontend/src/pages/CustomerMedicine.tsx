import { Button } from "@mui/material";
// import { useSearchParams } from 'react-router-dom';
import MedicineCard from "../components/MedicineCard";
import Spinner from "../components/Spinner";
import UseMedicine from "../store/UseMedicine";
import UseParameter from "../hooks/UseParameter";

const CustomerMedicine = () => {
  
  const [searchParams, changeSearchParam] = UseParameter();
  const pageNumber = searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")) : 0
  const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 15
  const [data, isLoading, isError] = UseMedicine(pageNumber, pageSize)

  return (
    <>
      {isLoading && <Spinner />}
      {!isError && !isLoading &&
        <div>
          {data?.map((medicine) => {
            return <MedicineCard medicine={medicine} key={medicine.id} />
          })}
          <Button disabled={pageNumber == 0} onClick={() => { changeSearchParam("pageNumber", pageNumber - 1) }} >Back</Button>
          <Button disabled={data?.length != pageSize} onClick={() => { changeSearchParam("pageNumber", pageNumber + 1) }}>Next</Button>
        </div>}

    </>
  )
}

export default CustomerMedicine