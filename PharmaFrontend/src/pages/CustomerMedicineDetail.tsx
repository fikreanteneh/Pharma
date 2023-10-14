import { useParams } from 'react-router-dom';
import UseParameter from '../hooks/UseParameter';
import UseMedicineDetail from '../store/UseMedicineDetail';
import UsePharmacyMedicineForMedicine from '../store/UsePharamcyMedicineForMedicine';

const CustomerMedicineDetail = () => {
  const { medicineid } = useParams()
  const [searchParams, changeQueryParam] = UseParameter()
  // const [currAddress, setCurrAddress] = useState({ latitude: 9, longitude: 38 })

  const pageNumber = searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")) : 0
  const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 15
  let currAddress = { latitude: 9, longitude: 38 }
  navigator.geolocation.getCurrentPosition(position => {
    currAddress = { latitude: position.coords.latitude, longitude: position.coords.longitude }
  })

  const [medicine, medicineLoading, medicineError] = UseMedicineDetail(medicineid ?? "")
  const [pharmacyMedicine, pharmacyMedicineLoading, pharmacyMedicineError] = UsePharmacyMedicineForMedicine(medicineid ?? "", currAddress, pageNumber, pageSize)

  return (
    <div>{medicineid}</div>
  )
}

export default CustomerMedicineDetail