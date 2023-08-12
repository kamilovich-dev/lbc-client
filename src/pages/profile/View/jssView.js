import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        padding: '10px',
        border: '1px solid red',
    },
    headWrapper: {
        fontSize: '14pt',
        fontWeight: '500',
        marginBottom: '20px',
        userSelect: 'none'
    },
    modesWrapper: {
        marginBottom: '20px',
        display: 'flex',
        gap: '10px'
    },
    modesWrapper__item: {
        backgroundColor: '#81C2FE',
        width: '100px',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#4B75FE'
        }
    },
    cardsWrapper: {

    },
    editWrapper: {
        marginBottom: '20px'
    },
    cardsHead: {
        marginBottom: '5px',
    },
    cardsHead__name: {
        display: 'inline-block',
        marginRight: '10px',
    },
    cardsHead__filter: {
        display: 'inline-block',
    },
    link: {
        textDecoration: 'none',
        backgroundColor: '#C2FEDF',
        color: 'black',
        display: 'block',
        '&:hover': {
            backgroundColor: '#3CFE63',
        },
        marginBottom: '5px'
    }

})

export default useStyles;