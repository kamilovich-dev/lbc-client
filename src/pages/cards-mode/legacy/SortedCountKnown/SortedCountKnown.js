import React from 'react';
import useStyles from './jssSortedCountKnown';

export default function SortedCountKnown( {count, hightlightKnowsStage} ) {

    //hightlightKnowsStage: -1:no highlight; 0:doesnt know -1; 1:know -1; 2:doesnt know +1; 3:know +1
    const jss = useStyles( {hightlightKnowsStage} );

    const text = hightlightKnowsStage == 1 ? '-1' :
                hightlightKnowsStage == 3 ? '+1' :
                count;

    return(
            <div className={jss.wrapper}>
                <div className={jss.text}>Знаю</div>
                <div className={jss.count}>{text}</div>
            </div>
    )
}