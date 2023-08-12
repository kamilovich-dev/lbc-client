import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#D5D8DF'
        }
    },
})

export default useStyles;