import React from 'react';
import useStyles from './jssFilter';

export default function Filter( {filterCategory, setFilterCategory} ) {
    const jss = useStyles();

    function handleChange(e) {
        setFilterCategory(e.target.value);
    }

    return (
        <div className={jss.filter}>
            <select name="module-filter" onChange={handleChange} value={filterCategory}>
                <option value="original" >Оригинал</option>
                <option value="byAlphabet" >По алфавиту</option>
            </select>
        </div>
    )
}