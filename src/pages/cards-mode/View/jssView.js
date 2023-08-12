import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        position: 'absolute',
        left: '0',
        top: '0',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '70px 1fr',
    },
    headWrapper: {
        display: 'flex',
        flex: '1 1 1',
        alignItems: 'center',
        padding: '10px 30px',
    },
    headWrapperItem: {
        width: '100%',
        '&:last-child': {
            display: 'flex',
            justifyContent: 'flex-end',
        }
    },
    centerWrapper: {
        backgroundColor: '#F6F7FB',
    },
    progressLine: {
        marginBottom: '50px',
    },
    top: {
        width: '980px',
        margin: 'auto',
        display: 'flex',
        marginBottom: '10px',
    },
    topItem: {
        flex: '1 1 auto',
        '&:nth-child(2)': {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    },
    card: {
        paddingBottom: '10px'
    },
    bottom: {
        width: '980px',
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr',
    },
    bottomColumn: {
        display: 'flex',
        padding: '5px',
        display: 'flex',
        '&:nth-child(1)': {
            justifyContent: 'flex-start',
        },
        '&:nth-child(2)': {
            justifyContent: 'center',
            gap: '80px'
        },
        '&:nth-child(3)': {
            justifyContent: 'flex-end',
        },
    },

})

export default useStyles;