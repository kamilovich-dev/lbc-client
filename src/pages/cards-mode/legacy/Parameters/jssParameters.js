import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    parameters: {
        borderRadius: '10px',
        border: '1px solid #D9DDE8',
        width: '100px',
        marginRight: '10px'
    },
    parametersModal: {
        height: '600px',
        backgroundColor: 'white',
    },
    sort: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 30px 0px 30px',
        marginBottom: '10px'
    },
    sortHead: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#5B637A',
        flex: '999 1 auto',
    },
    sortSwitch: {
        flex: '1 1 auto',
    },
    sortExplain: {
        display: 'flex',
        padding: '0px 30px 10px 30px',
        marginBottom: '30px'
    },
    sortExplainText: {
        lineHeight: '1.3em',
    },
    star: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 30px 0px 30px',
        marginBottom: '30px'
    },
    starHead: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#5B637A',
        flex: '999 1 auto',
    },
    starSwitch: {
        flex: '1 1 auto',
    },
    answer: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 30px 0px 30px',
        marginBottom: '30px'
    },
    answerhead: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#5B637A',
        flex: '999 1 auto',
    },
    annswerSelect: {
        flex: '1 1 auto',
    },
    keys: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 30px 0px 30px',
        marginBottom: '50px'
    },
    keysHead: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#5B637A',
        flex: '999 1 auto',
    },
    keysList: {
        flex: '1 1 auto',
    },
    restart: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 30px 0px 30px',
        marginBottom: '30px'
    },
    restartHead: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#DA4543',
        flex: '999 1 auto',
        '&:hover': {
            cursor: 'pointer',
        }
    },
})

export default useStyles;