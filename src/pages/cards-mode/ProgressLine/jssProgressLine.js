import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        backgroundColor: 'white',
        height: '3px',
        width: '100%',
        boxShadow: '1px 5px 8px 0px rgba(34, 60, 80, 0.1)',

    },
    progressLine: props => ({
        backgroundColor: '#7583FF',
        width: ( (props.currentCount + 1) / props.cardsCount) * 100 + '%',
        height: '3px',
    })
})

export default useStyles;