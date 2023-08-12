import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    row: {
        backgroundColor: '#86B6FE',
        padding: '5px',
        borderRadius: '10px',
        display: 'flex',
        gap: '10px',
        marginBottom: '10px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#647DFE'
        }
    }
})

export default useStyles;