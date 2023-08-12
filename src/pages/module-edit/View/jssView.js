import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    headWrapper: {

    },
    pageName: {
        display: 'block',
        marginBottom: '20px',
        fontSize: '14pt',
        fontWeight: '500',
        userSelect: 'none'
    },
    name: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px'
    },
    description: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px'
    },
    wrapper: {
        padding: '10px',
        border: '1px solid green',
    },
    addCardButton: {
        marginBottom: '10px',
        marginRight: '10px'
    },
    swapTermins: {
        marginBottom: '10px'
    },
    accept: {
        backgroundColor: '#8BFE93',
        borderRadius: '10px',
        width: '140px',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        height: '30px',
        lineHeight: '30px',
        display: 'inline-block',
        '&:hover' : {
            backgroundColor: '#00FE2A',
        }
    }
})

export default useStyles;