import { useQuery } from "@tanstack/react-query"
import { getMedicineRequest } from "../state/request/medicineRequest"
import UsePage from "../hooks/PageHook";
import UseSearch from "../hooks/SearchHook";
import handleRequest from "../hooks/ReactQueryFetch";
import { BaseResponseType } from "../state/types/requestTypes";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { Medicine } from "../state/types/medicineTypes";
import MedicineCard from './../components/MedicineCard';

const CustomerMedicine = () => {

  const [pageNumber, changePageNumber, pageSize, changePageSize] = UsePage();
  const [search, changeSeacrh] = UseSearch();


  const { isLoading, error, data } = useQuery(
    ['Medicine', pageNumber, pageSize, search],
    () => handleRequest(() => getMedicineRequest(pageNumber, pageSize, search))

  );

  if (isLoading) {
    return <Spinner />;
  }

  console.log("NOOOOO", data)
  if (error) {
    toast.error(error.message)
  }

  return (
    <div>
      <ul>
        {data?.message?.map((medicine: Medicine) => (
          <li key={medicine.id}>
            <MedicineCard medicine={medicine} />
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default CustomerMedicine