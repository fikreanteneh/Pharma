import { useSearchParams } from 'react-router-dom';

const UseParameter = (): [URLSearchParams, (target: string, value: number | string) => void] => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const changeSearchParam = (target: string, value: number | string) => {
        setSearchParams((prevSearchParams) => {
            prevSearchParams.set(target, value.toString())
            return prevSearchParams
        })
    }

    return [searchParams, changeSearchParam]
}

export default UseParameter