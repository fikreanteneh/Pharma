import SearchIcon from '@mui/icons-material/Search';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useState } from 'react';


const SearchBar = (props: {
    searchValue: string,
    changeSearchParam: (arg1: string, arg2: string) => void,
    suggestion(arg1: string): [
        string[],
        (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<unknown[], unknown>>,
        boolean,
        "error" | "loading" | "success",
        boolean | undefined
    ]
}) => {
    const { searchValue, changeSearchParam, suggestion } = props;
    const [value, setValue] = useState(searchValue);
    const [focused, setFocused] = useState<boolean>(false);
    const [data, fetchNextPage, isFetchingNextPage, status, hasNextPage] = suggestion(value);
    return (
        <div className="relative w-[100%] max-w-[720px] flex justify-center align-middle m-4 h-fit" >
            <input type="text" placeholder="Search.." name="search" value={value}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => { setValue(e.target.value) }}
                className="w-4/5 h-12 p-3 border rounded-tl-lg rounded-bl-lg border-cyan-950 focus:border-slate-800" />

            <button type="submit" onClick={() => { changeSearchParam("search", value) }}
                className="w-1/5 h-12 text-white rounded-tr-lg rounded-br-lg bg-slate-700 hover:bg-slate-800" >
                <SearchIcon fontSize="large" />
            </button>
            {data && data.length > 0 && focused && (
                <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded shadow-md top-full">
                    {data.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                console.log(item, "-------------------");
                                // changeSearchParam("search", item);
                            }}
                            className="px-4 py-2 hover:bg-gray-100"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}

export default SearchBar