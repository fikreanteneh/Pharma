import { useState } from 'react';

const UseToggle = (initialState = false): [boolean, () => void] => {
    const [value, setValue] = useState<boolean>(initialState);

    const toggle = () => {
        setValue((prevValue) => !prevValue);
    };

    return [value, toggle];
};

export default UseToggle;