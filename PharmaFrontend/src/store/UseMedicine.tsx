import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { Medicine } from '../models/Medicine';
import MedicineRepository from '../repositories/MedicineRepository';

const UseMedicine = (pageNumber: number, pageSize: number,): [
    Medicine[] | undefined,
    boolean,
    boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['Medicine', pageNumber, pageSize],
        () => ReactQueryFetch(() => MedicineRepository.searchMedicine({ pageNumber, pageSize, name: "" })))

    return [data, isLoading, isError]

}

export default UseMedicine;