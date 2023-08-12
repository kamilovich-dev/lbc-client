import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    filter: {
        display: 'inline-block',
        padding: '10px',
        border: '1px solid red',
    },
})

export default function Filter( {filterCategory, setFilterCategory} ) {
    const jss = useStyles();

    function handleChange(e) {
        setFilterCategory(e.target.value);
    }

    return (
        <div className={jss.filter}>
            <select name="modules-filter" onChange={handleChange} value={filterCategory}>
                <option value="abc" >По возрастанию</option>
                <option value="cba" >По убыванию</option>
            </select>
        </div>
    )
}