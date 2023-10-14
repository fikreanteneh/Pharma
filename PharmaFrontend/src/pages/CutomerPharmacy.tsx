import useAddress from "../hooks/UseAddress";
import UseParameter from "../hooks/UseParameter";
import UsePharmacy from "../store/UsePharamcy";

const CutomerPharmacy = () => {
  const [searchParams, changeSearchParam] = UseParameter();
  const currAddress = useAddress();
  const pageNumber = searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")) : 0
  const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 15
  const [data, isLoading, isError] = UsePharmacy(currAddress, pageNumber, pageSize)
  console.log(data)
  return (
    <div>CutomerPharmacy</div>
  )
}

export default CutomerPharmacy