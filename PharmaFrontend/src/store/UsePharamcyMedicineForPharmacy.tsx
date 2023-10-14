import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { PharmacyMedicine } from '../models/PharamcyMedicine';
import PharmacyMedicineRepository from '../repositories/PharmacyMedicineRepository';

const UsePharmacyMedicineForPharamcy = (pharmacyid: string, pageNumber: number, pageSize: number): [
        PharmacyMedicine[] | undefined,
        boolean,
        boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['PharmacyMedicine', pharmacyid, pageNumber, pageSize],
        () => ReactQueryFetch(() => PharmacyMedicineRepository.getMedicineByPharmacy({pharmacyid, pageNumber, pageSize })))

    return [data, isLoading, isError]

}

export default UsePharmacyMedicineForPharamcy;