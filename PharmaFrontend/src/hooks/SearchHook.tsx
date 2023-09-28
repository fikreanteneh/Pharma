import { useState } from 'react';

const UseSearch = (initialState = ''): [string, (value:string) => void] => {
    const [search, setsearch] = useState<string>(initialState);

    const changeSearch = (value: string ) => {
        setsearch(value);
    };

    return [search, changeSearch];
};

export default UseSearch;