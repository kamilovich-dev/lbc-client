import React from 'react';
import useStyles from './jssSortedCountUnknown';

export default function SortedCountUnknown( {know, count, hightlightKnowsStage} ) {

        //hightlightKnowsStage: -1:no highlight; 0:doesnt know -1; 1:know -1; 2:doesnt know +1; 3:know +1
        const jss = useStyles( {hightlightKnowsStage} );

        const text = hightlightKnowsStage == 0 ? '-1' :
                    hightlightKnowsStage == 2 ? '+1' :
                    count;

        return(
                <div className={jss.wrapper}>
                    <div className={jss.count}>{text}</div>
                    <div className={jss.text}>Еще изучаю</div>
                </div>
        )
}