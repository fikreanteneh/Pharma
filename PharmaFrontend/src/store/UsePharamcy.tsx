import { useQuery } from '@tanstack/react-query';
import ReactQueryFetch from '../hooks/ReactQueryFetch';
import { Pharmacy } from '../models/Pharamcy';
import PharmacyRepository from '../repositories/PharmacyRepository';

const UsePharmacy = (address: {latitude: number, longitude: number}, pageNumber: number, pageSize: number,): [
    Pharmacy[] | undefined,
    boolean,
    boolean] => {

    const { data, isLoading, isError } = useQuery(
        ['Pharmacy', ],
        () => ReactQueryFetch(() => PharmacyRepository.getPharmacyByLocation({ address, pageNumber, pageSize })))

    return [data, isLoading, isError]

}

export default UsePharmacy;