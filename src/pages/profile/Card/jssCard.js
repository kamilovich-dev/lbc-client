import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        padding: '10px',
        border: '1px solid red',
    },
    card: {
       backgroundColor: '#9FD2FE',
       padding: '5px',
       marginBottom: '5px',
       '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#5087FE',
       }
    },
    term: {
        color: 'black',
    },
    definition: {
        color: 'black'
    }
})

export default useStyles;