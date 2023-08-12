import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: props => ({
        borderRadius: '50%',
        backgroundColor: props.isMixed ? 'white' : 'transparent',
        border: props.isMixed ? '1px solid #E6E8EF' : '1px solid transparent' ,
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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