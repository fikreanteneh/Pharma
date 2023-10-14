import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { PharmacyMedicine } from '../models/PharamcyMedicine';
import PharmacyMedicineRepository from '../repositories/PharmacyMedicineRepository';

const UsePharmacyMedicineForMedicine = (medicineid: string, address: {
    latitude: number;
    longitude: number;
}, pageNumber: number, pageSize: number,): [
        PharmacyMedicine[] | undefined,
        boolean,
        boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['PharmacyMedicine', medicineid, pageNumber, pageSize],
        () => ReactQueryFetch(() => PharmacyMedicineRepository.getPharmacyByMedicine({ medicineid, address, pageNumber, pageSize })))

    return [data, isLoading, isError]

}

export default UsePharmacyMedicineForMedicine;