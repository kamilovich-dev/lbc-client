import React from 'react';
import { createUseStyles } from 'react-jss';
import {
    Link,
  } from "react-router-dom";

  const useStyles = createUseStyles({
    linkToModule: {
        textDecoration: 'none',
        backgroundColor: '#C2FEDF',
        color: 'black',
        display: 'block',
        '&:hover': {
            backgroundColor: '#3CFE63',
        }
    },
})

export default function LinkToModule( {module, moduleId} ) {
    const jss = useStyles();

    return (
        <Link to={`/${moduleId}`} className={jss.linkToModule}>
            <h2>{module.name}</h2>
            <p>{module.author}</p>
            <p>{module.cards?.length} терминов</p>
        </Link>
    )
}