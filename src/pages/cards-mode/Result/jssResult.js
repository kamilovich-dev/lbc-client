import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        margin: 'auto',
        width: '980px',
        height: '680px',
    },
    head: {
        display: 'flex',
    },
    headText: {
        fontSize: '24px',
        color: '#2E3856',
        fontWeight: 'bold',
        padding: '20px 0px 50px 0px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'minmax(50px, auto) minmax(50px, auto) minmax(50px, auto) minmax(50px, auto)',
        gap: '10px'
    },
    resultHeadText: {
        color: '#586380',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    nextStepsText: {
        color: '#586380',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    result: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gridTemplateRows: '1fr 1fr',
    },
    resultDiagram: {
        gridRow: '1/3',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    resultDiagramText: {
        color: '#939BBB',
        fontSize: '14px',
        fontWeight: '500',
        position: 'absolute',
        left: '25px'
    },
    resultPassed: {
        display: 'flex',
        alignItems: 'center',
        color: '#18AE8E',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    resultPassedCount: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    resultPassedCountBack: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6FCF4',
        width: '50px',
        border: '1px solid #98F1D1',
        borderRadius: '20px',
        height: '30px'
    },
    resultPassedCountText: {
        color: '#18AE79',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    resultLeft: {
        display: 'flex',
        alignItems: 'center',
        color: '#D05700',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    resultLeftCount: {
        display: 'flex',
        alignItems: 'center',
    },
    resultLeftCountBack: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF6EF',
        width: '50px',
        border: '1px solid #FECB9D',
        borderRadius: '20px',
        height: '30px'
    },
    resultLeftCountText: {
        color: '#D05700',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    nextMode: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: '1fr 1fr',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '10px 5px',
        boxShadow: '4px 4px 18px 0px rgba(125, 172, 217, 0.2)',
        border: '2px solid white',
        '&:hover': {
            cursor: 'pointer',
            border: '2px solid rgba(94, 90, 90, 0.2)'
        }
    },
    nextModeItemImage: {
        gridRow: '1/3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextModeImage: {
        border: '1px solid #FBDDC4',
        backgroundColor: '#FFF6EF',
        width: '70px',
        height: '70px',
        borderRadius: '10px',
    },
    nextModeHeadText: {
        color: '#4255FF',
        fontSize: '18px',
        fontWeight: '500',
    },
    nextModeText: {
        lineHeight: '1.2em',
        fontSize: '14px'
    },
    returnToLastQuestion: {
        color: '#586380',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'flex-end',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    restart: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: '1fr 1fr',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        padding: '10px 5px',
        boxShadow: '4px 4px 18px 0px rgba(125, 172, 217, 0.2)',
        border: '2px solid white',
        '&:hover': {
            cursor: 'pointer',
            border: '2px solid rgba(94, 90, 90, 0.2)'
        }
    },
})

export default useStyles;