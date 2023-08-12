import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper:{
        padding: '5px 10px',
        perspective: '2000px',
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto',
        overflowX: 'clip',
        overflowY: 'visible',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    flipCard: {
        position: 'relative',
        margin: 'auto',
        width: '980px',
        height: '680px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '4px 4px 8px 2px rgba(34, 60, 80, 0.09)',
        transformStyle: 'preserve-3d',
    },
    invisible: {
        visibility: 'hidden',
    },
    commonCard: {
        display: 'grid',
        position: 'absolute',
        left: '0',
        top: '0',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '60px 1fr',
        height: '100%',
        width: '100%',
        backfaceVisibility: 'hidden',
    },
    headRow: {
        gridColumn: '1/3',
        display: 'flex',
        padding: '10px',
    },
    headRowItemsLeft: {
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headRowItemsRight: {
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'flex-end',
        gap: '10px',
        alignItems: 'center'
    },
    text: {
        fontSize: '32px',
        gridColumn: '1/3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::selection': {
            background: '#DBDFFF'
        }
    },
    front: {
        composes: '$commonCard',
    },
    back: {
        composes: '$commonCard',
        transform: 'rotateX(180deg)',
    },
    divided: {
        margin: 'auto',
        width: '980px',
        height: '680px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '20px'
    },
    dividedFront: {
        position: 'relative',
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        gridRow: '1/2',
        gridColumn: '1/4',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '4px 4px 8px 2px rgba(34, 60, 80, 0.09)',
    },
    dividedBack: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridRow: '2/4',
        gridColumn: '1/4',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '4px 4px 8px 2px rgba(34, 60, 80, 0.09)',
    },

    /*animations */
    // momentallyTransitioned: {
    //     transition: `0s all ease-in-out`,
    // },
    // slowTransitioned: {
    //     transition: '0.3s all ease-in-out',
    // },
    // flipped: props => ({
    //     transform: 'rotateX(' + (props.flipAngle) +'deg)',
    // }),
    // navigatedNext: {
    //     transform: 'translateX(80px) rotateY(-20deg)',
    // },
    // navigatedPrev: {
    //     transform: 'translateX(-80px) rotateY(20deg)',
    // },
    // sortedKnown: {
    //    transform: 'translateZ(20px) rotateZ(-2deg)',
    // },
    // sortedUnknown: {
    //     transform: 'translateZ(20px) rotateZ(2deg)',
    // },
    // sortedCanceled: {
    //     opacity: '0.3',
    //     transform: 'translateX(100px)',
    // },
})

export default useStyles;