import React, { useState, useEffect }  from 'react';
import useStyles from './jssTestKeyFrames';

export default function TestKeyFrames( ) {
    const backgroundColor = 'red';
    const jss = useStyles( {backgroundColor} );
    const [isAddAnimation, setIsAddAnimation] = useState(false);
    const [keyFrameClassName, setKeyFrameClassName] = useState(jss.wrapper);

    useEffect( () => {
        if (isAddAnimation) {
            setKeyFrameClassName(`${jss.wrapper} ${jss.animated}`)
        } else {
            setKeyFrameClassName(`${jss.wrapper}`)
        }
    }, [isAddAnimation])

    return(
        <>
            <div className={keyFrameClassName}>
                Key frames
            </div>
            <button onClick={() => setIsAddAnimation(!isAddAnimation)}>{isAddAnimation ? 'Убрать анимацию' : 'Добавить анимацию'}</button>
        </>
    )
}