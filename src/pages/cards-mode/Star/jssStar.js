import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        backgroundColor: 'white',
        borderRadius: '50%',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#EDEFF4',
        },
        '&:active': {
            backgroundColor: '#D9DDE8'
        }
    },
    star: props => ({
        width: '20px',
        height: '20px',
        backgroundColor: props.card.starFilled ? '#FFCD1F' : '#586380',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    }),
})

export default useStyles;