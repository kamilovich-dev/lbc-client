import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    search: {
        display: 'inline-block',
        padding: '10px',
        border: '1px solid #A295FE',
    }
})

export default function Search( {searchText, setSearchText} ) {
    const jss = useStyles();

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    return (
        <div className={jss.search}>
            <input type="text" placeholder="Search" onChange={handleChange} value={searchText} />
        </div>
    )
}