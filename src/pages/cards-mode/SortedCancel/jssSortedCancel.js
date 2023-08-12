import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: props => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '50px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#EDEFF4',
        },
        '&:active': {
            backgroundColor: '#D9DDE8'
        }
    }),
})

export default useStyles;