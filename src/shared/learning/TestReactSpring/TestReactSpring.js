import React from 'react';
import useStyles from './jssTestReactSpring';
import { useSpring, animated, config } from 'react-spring';

export default function TestReactSpring( ) {
    const [springs, api] = useSpring(() => ({
    }));
    const jss = useStyles();

    const handleClick = () => {
        api.start({
            from: {
                x: 0
            },
            to: {
                x: 100
            }
        })
    }

    return (
        <animated.div
            onClick={handleClick}
            className={jss.wrapper}
            style={{
                ...springs,
                }
            }
        />
    )
}