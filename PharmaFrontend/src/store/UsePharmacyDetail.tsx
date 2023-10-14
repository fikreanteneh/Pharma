import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { Pharmacy } from '../models/Pharamcy';
import PharmacyRepository from '../repositories/PharmacyRepository';

const UsePharmacyDetail = (pharmacyid: string): [Pharmacy | undefined, boolean, boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['Medicine', pharmacyid],
        () => ReactQueryFetch(() => PharmacyRepository.getPharmacyById(pharmacyid)))

    return [data, isLoading, isError]
}

export default UsePharmacyDetail;