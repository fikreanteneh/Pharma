import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { PharmacyMedicine } from '../models/PharamcyMedicine';
import PharmacyMedicineRepository from '../repositories/PharmacyMedicineRepository';

const UseStore = (id: string): [
    PharmacyMedicine[] | undefined,
    boolean,
    boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['PharamcyMedicine'],
        () => ReactQueryFetch(() => PharmacyMedicineRepository.getStoreItems(id)))

    return [data, isLoading, isError]

}

export default UseStore;