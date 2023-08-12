import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        backgroundColor: 'white',
        borderRadius: '50%',
        fontSize: '24px',
        userSelect: 'none',
        border: '1px solid #D6DAE4',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#EDEFF4',
        },
        '&:active': {
            backgroundColor: '#D9DDE8'
        }
    },
})

export default useStyles;