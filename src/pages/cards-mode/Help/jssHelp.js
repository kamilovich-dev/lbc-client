import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: props => ({
        padding: '5px 15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.showHelp ? '#EDEFF4' : 'transparent',
        borderRadius: '20px',
    }),
    text: {
        marginLeft: '5px',
    }
})

export default useStyles;