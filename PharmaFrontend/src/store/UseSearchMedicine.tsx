import { FetchNextPageOptions, InfiniteQueryObserverResult, useInfiniteQuery } from "@tanstack/react-query";
import ReactQueryFetch from "../hooks/ReactQueryFetch";
import { Medicine } from "../models/Medicine";
import MedicineRepository from "../repositories/MedicineRepository";



const UseSearchMedicine = (search: string, pageSize: number = 8): [
    string[],
    (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<Medicine[], unknown>>,
    boolean,
    "error" | "loading" | "success",
    boolean | undefined] => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
        ['Medicine', search],
        ({ pageParam = 0 }) => ReactQueryFetch(() => MedicineRepository.searchMedicine({ pageNumber: pageParam, pageSize, search: search })),
        { getNextPageParam: (lastPage, allPages) => lastPage.length < pageSize ? null : allPages.length }
    );

    const medicine: string[] = []
    for (const page of data?.pages ?? []) {
        for (const item of page) {
            medicine.push(`${item.name}`)
        }
    }

    return [medicine, fetchNextPage, isFetchingNextPage, status, hasNextPage]
}

export default UseSearchMedicine