import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: props => ({
        display: 'flex',
        backgroundColor: props.autoplayStage == -1 ? 'transparent' : 'white',
        border: props.autoplayStage == -1 ? '1px solid transparent' : '1px solid #E6E8EF',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '50px',
        borderRadius: '50%',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#EDEFF4',
        },
        '&:active': {
            backgroundColor: '#D9DDE8'
        }
    })
})

export default useStyles;