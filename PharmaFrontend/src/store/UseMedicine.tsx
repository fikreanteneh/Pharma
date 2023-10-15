import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { Medicine } from '../models/Medicine';
import MedicineRepository from '../repositories/MedicineRepository';

const UseMedicine = (pageNumber: number, pageSize: number, name: string): [
    Medicine[] | undefined,
    boolean,
    boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['Medicine', pageNumber, pageSize],
        () => ReactQueryFetch(() => MedicineRepository.getMedicine({ pageNumber, pageSize, search: name })))

    return [data, isLoading, isError]

}

export default UseMedicine;