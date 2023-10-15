import { Card } from "@mui/material";
import SearchBar from "../components/SearchBar";
import UseAddress from "../hooks/UseAddress";
import UseParameter from "../hooks/UseParameter";
import { Pharmacy } from "../models/Pharamcy";
import UsePharmacy from "../store/UsePharamcy";
import UseSearchPharmacy from "../store/UseSearchPharmacy";

const CutomerPharmacy = () => {
  const [searchParams, changeSearchParam] = UseParameter();
  const currAddress = UseAddress();
  const pageNumber = searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")) : 0
  const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 15
  const search = searchParams.get("search") ? searchParams.get("search") : ""
  const [data, isLoading, isError] = UsePharmacy(currAddress, pageNumber, pageSize)


  return (
    <>
      <SearchBar searchValue={search ?? ""} changeSearchParam={changeSearchParam} suggestion={UseSearchPharmacy} />
      <Card>
        {isError && <h1>Error</h1>}
        {isLoading && <h1>Loading...</h1>}
        {!isError && !isLoading && data && data.map((pharmacy: Pharmacy) => (
          <div key={pharmacy.id}>
            <h1>{pharmacy.name}</h1>
          </div>
        ))}
      </Card>
    </>
  )
}

export default CutomerPharmacy