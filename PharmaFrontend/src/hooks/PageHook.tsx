import { useState } from 'react';

const UsePage = (initialPageNumber = 0, initialPageSize = 20): [number, (num: number) => void, number, (num: number) => void] => {
    const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);

    const changePageNumber = (num: number) => { 
        setPageNumber( num);
    }

    const changePageSize = (num: number) => { 
        setPageSize( num);
    }

    return [pageNumber, changePageNumber, pageSize, changePageSize];
};

export default UsePage;