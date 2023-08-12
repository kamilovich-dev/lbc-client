import React from 'react';
import { createUseStyles } from 'react-jss';
import { createModule } from 'data/module-row';

const useStyles = createUseStyles({
    create: {
        display: 'inline-block',
        padding: '10px',
        border: '1px solid #A295FE',
    }
});

export default function Create( {originalModules, setOriginalModules} ) {
    const jss = useStyles();

    function handleClick() {
        const _originalModules = [...originalModules];
        _originalModules.push(createModule(_originalModules));
        setOriginalModules(_originalModules);
    }

    return (
        <div className={jss.create}>
            <input type="button" onClick={handleClick} value="Создать" />
        </div>
    )
}
