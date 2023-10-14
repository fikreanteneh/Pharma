import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactQueryFetch from "../hooks/ReactQueryFetch";
import { Medicine } from "../models/Medicine";
import MedicineRepository from "../repositories/MedicineRepository";

const UseMedicineSearch = (): [
  string,
  (value: string) => void,
  InfiniteData<Medicine[]> | undefined,
  (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<Medicine[], unknown>>,
  boolean,
  "error" | "loading" | "success",
  boolean | undefined] => {

  const pageSize = 15;
  const [search, setSearch] = useState<string>("")
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery(
    ['Medicine', search],
    ({ pageParam = 0 }) => ReactQueryFetch(() => MedicineRepository.searchMedicine({ pageNumber: pageParam, pageSize, name: search })),
    { getNextPageParam: (lastPage, allPages) => lastPage.length < pageSize ? null : allPages.length }
  );

  const handleSearch = (value: string) => {
    setSearch(value)
    refetch()
  }
  return [search, handleSearch, data, fetchNextPage, isFetchingNextPage, status, hasNextPage]
}

export default UseMedicineSearch;