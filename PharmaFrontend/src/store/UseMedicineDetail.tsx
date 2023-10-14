import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { Medicine } from '../models/Medicine';
import MedicineRepository from '../repositories/MedicineRepository';

const UseMedicineDetail = (medicineid: string): [Medicine | undefined, boolean, boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['Medicine', medicineid],
        () => ReactQueryFetch(() => MedicineRepository.getMedicineById(medicineid)))

    return [data, isLoading, isError]
}

export default UseMedicineDetail;