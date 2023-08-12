import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { getModules } from 'data/module-row';
import Filter from 'routes/module-row/components/Filter/Filter';
import Search from 'routes/module-row/components/Search/Search';
import LinkToModule from 'routes/module-row/components/LinkToModule/LinkToModule';
import Create from 'routes/module-row/components/Create/Create';

const useStyles = createUseStyles({
    view: {
        padding: '10px',
        border: '1px solid green',
    }
})

export default function View() {
    const jss = useStyles();
    const [filterCategory, setFilterCategory] = useState('abc');
    const [searchText, setSearchText] = useState('');
    const [originalModules, setOriginalModules] = useState(getModules());

    const _modules = [...originalModules];

    _modules.sort( (a, b) => {
        if (filterCategory === 'abc') {
            return a.name > b.name ? 1 : -1;
        } else {
            return a.name > b.name ? -1 : 1;
        }
    } )

    if (searchText) {
        for (let i = 0; i < _modules.length; i++) {
            const whereAmISearching = _modules[i].name.toLowerCase();
            const whatAmISearching = searchText.toLowerCase();
            if (whereAmISearching.indexOf(whatAmISearching) === -1) {
                _modules.splice(i, 1);
                i--;
            }
        }
    }

    return (
        <div className={jss.view}>
            <Create
                originalModules={originalModules}
                setOriginalModules={setOriginalModules} />
            <Filter
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}/>
            <Search
                searchText={searchText}
                setSearchText={setSearchText}/>
            { _modules.map( item => <LinkToModule module={item} moduleId={item.id} key={item.id}/>)}
        </div>
    )
}