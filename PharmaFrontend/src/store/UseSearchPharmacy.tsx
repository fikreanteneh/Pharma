import { FetchNextPageOptions, InfiniteQueryObserverResult, useInfiniteQuery } from "@tanstack/react-query";
import ReactQueryFetch from "../hooks/ReactQueryFetch";
import { Pharmacy } from "../models/Pharamcy";
import PharmacyRepository from "../repositories/PharmacyRepository";



const UseSearchPharmacy = (search: string, pageSize: number = 8): [
    string[],
    (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<Pharmacy[], unknown>>,
    boolean,
    "error" | "loading" | "success",
    boolean | undefined] => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
        ['Medicine', search],
        ({ pageParam = 0 }) => ReactQueryFetch(() => PharmacyRepository.searchPharamcy({ pageNumber: pageParam, pageSize, search: search })),
        { getNextPageParam: (lastPage, allPages) => lastPage.length < pageSize ? null : allPages.length }
    );

    const pharmacy: string[] = []
    for (const page of data?.pages ?? []) {
        for (const item of page) {
            pharmacy.push(`${item.name}`)
        }
    }

    return [pharmacy, fetchNextPage, isFetchingNextPage, status, hasNextPage]
}

export default UseSearchPharmacy